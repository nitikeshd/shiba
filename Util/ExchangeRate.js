'use strict';

const fx         = require('money');
const debug      = require('debug')('shiba:exchangerate');

const Config     = require('../Config');
const Cache      = require('./Cache');
const Bitstamp   = require('./Bitstamp');
const Poloniex   = require('./Poloniex');
const OXR        = require('./OpenExchangeRates');

const fiatRatesCache = new Cache({
  // Cache fiat exchange rates for 1 hour.
  maxAge: 1000 * 60 * 60,
  load: function*() {
    debug('Downloading fiat exchange rates');
    // Oxr free plan only allows USD as the base currency.
    return yield* OXR.getLatest({
      base: 'USD',
      appId: Config.OXR_APP_ID
    });
  }
});

function* getFiatRates() {
  debug('Getting fiat rates');
  var data = yield* fiatRatesCache.get('');
  debug('Updating fiat rate info');
  return data.rates;
}

function* getRates() {
  debug('Getting rates');

  let val    = yield [getFiatRates, Bitstamp.getAveragePrice];
  let rates  = val[0];
  let usdBtc = val[1];

  // Interestingly oxr provides us with a Bitcoin price from the Coindesk Price
  // Index. However, the oxr free plan only gives us hourly updated rates. We
  // use the realtime Bitstamp price to be more up to date in this case.
  rates.BTC = 1 / usdBtc;
  rates.BIT = 1e6 / usdBtc;
  rates.SAT = 1e5 / usdBtc;

  debug('Updating Poloniex rate info');
  function importpolo(sym) {
    debug('Updating Poloniex ' + sym + ' rate');
    let id     = 'BTC_' + sym;
    if (!(id in Poloniex.ticker)) {
      debug('Rate info for ' + sym + ' missing. Delisted?');
      return;
    }
    let ticker = Poloniex.ticker[id];
    let avg    = (ticker.lowestAsk + ticker.highestBid) / 2;
    rates[sym] = 1 / (usdBtc * avg);
  }

  importpolo('CLAM');
  importpolo('DOGE'); rates.KOINU = 1e5 * rates.DOGE;
  importpolo('LTC');
  importpolo('NXT');
  importpolo('ETH');
  importpolo('ETC');
  importpolo('BURST');

  return rates;
}
exports.getRates = getRates;

function* getSymbols() {
  let rates = yield* getRates();
  return Object.keys(rates);
}
exports.getSymbols = getSymbols;

function* convert(from, to, amount) {
  let rates = yield* getRates();
  fx.rates = rates;
  fx.base  = 'USD';
  return fx(amount).convert({from: from, to: to});
}
exports.convert = convert;
