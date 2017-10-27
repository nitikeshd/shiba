shiba
=====
Step 1:

Download Shiba from git hub by command: git clone https://github.com/moneypot/shiba

Step 2:

Go inside your shiba folder: cd shiba

Step 3:

For running Shiba, you would need one session Id. Please follow the below process to getting a session Id.

1. Register in your Web Application (bustabit web server).
2. Then Click on the top left side of the URL Bar. please follow the below screenshot.
3. then Click on the coockies. After that expand the tab of your website and you will be able to find the Session id/Id from there.

then copy the session id from there.

Step 4:

Now open Config.js file by: vi Config.js

then replace the required fields. Ex: Client seed, Web server url with port, game server url with port and session id.

After the steps has been done, please save it by:- :wq

Step 5:

For running Shiba you can type: node Shiba.js

or for better process management, install PM2 for NodeJS and type: pm2 start Shiba.js
