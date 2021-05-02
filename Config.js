
let packageJson = require('./package.json');

/* eslint no-process-env: 0 */
module.exports =
{
  ENV:            process.env.NODE_ENV || 'development',
  VERSION:        packageJson.version,
  CLIENT_SEED:
    process.env.BUSTABIT_CLIENTSEED ||
    '0000000000000000059876e96f7a08c4b90976cea15664ad900cebab04f8274f',
  GAMESERVER:     process.env.BUSTABIT_GAMESERVER || 'https://gm2.dogetale.com',
  WEBSERVER:      process.env.BUSTABIT_WEBSERVER || 'https://dogetale.com',
  OXR_APP_ID:     process.env.OXR_APP_ID,
  SESSION:        process.env.SHIBA_SESSION,
  DATABASE:       process.env.SHIBA_DATABASE || 'postgres://dogeuser:Doge!123!@localhost:5432/shibadb',
  CHAT_HISTORY:   process.env.SHIBA_CHAT_HISTORY || 2000,
  GAME_HISTORY:   process.env.SHIBA_GAME_HISTORY || 200,
  /* keep in lowercase */
  USER_WHITELIST: [
    '01010100b',
    'alexk08',
    'almighty',
    'beebo',
    'bitcoininformation',
    'cooldad',
    'cowbay',
    'csm',
    'delorian',
    'dexon',
    'dexonbot',
    'dmt',
    'dooglus',
    'dxc',
    'gecox22',
    'kungfuant',
    'lakai',
    'martinbot',
    'marting',
    'neta',
    'netaban',
    'qcrc5u4',
    'rapetor',
    'ryan',
    'shiba',
    'steve',
    'techdeck',
    'turtledaddykim',
    'wake_up_son',
    'xrnath'
  ]
};
