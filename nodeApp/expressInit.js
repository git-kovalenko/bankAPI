const express = require('express');
const https = require('https');
const http = require('http');
const forceSsl = require('express-force-ssl');
const fs = require('fs');
const path = require('path');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const session = require('express-session');


module.exports = ({pool}) => {
  const merchant_database = require('./merchant_database')(pool);
  const actionsInit = require('./actions/index.js');
  const key = fs.readFileSync('certificates/private.key');
  const cert = fs.readFileSync( 'certificates/domain.crt' );
  const app = express();
  app.use(session({
    secret: 'secret_key',
    resave: true,
    saveUninitialized: true
  }));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '../dist')));
  app.use((req, res, next) => {

    // get the url pathname
    const pathname = parseurl(req).pathname
    if (!req.session.views) req.session.views = {};
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
    next();
  });
  app.use(forceSsl);
  app.set('forceSSLOptions', {
    enable301Redirects: true,
    trustXFPHeader: false,
    httpsPort: 443,
    sslRequiredMessage: 'SSL Required.'
  });

  const application = actionsInit({app, pool});

  https.createServer({key, cert}, application).listen(process.env.PORT || 443, function () {
    console.log('Server listening on port '+ (process.env.PORT || 443) +'!');
  });
  http.createServer(application).listen(80);
};
