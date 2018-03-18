const express = require('express');
const https = require('https');
const http = require('http');
const forceSsl = require('express-force-ssl');
const fs = require('fs');
const path = require('path');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

module.exports = ({pool}) => {
  const actionsInit = require('./actions/index.js');
  const key = fs.readFileSync('./certificates/private.key');
  const cert = fs.readFileSync( './certificates/domain.crt' );
  const sessionKey = fs.readFileSync( './certificates/sessionKey.txt', 'utf8' );
  const app = express();
  app.use(session({
    secret: sessionKey,
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

  app.use(expressJwt({
    secret: key,
  }).unless({path: ['/login']}));
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
  });

  app.post('/login', (req, res) => {
    const user = {id: 3};
    const token = jwt.sign({user}, key);
    res.json({token});
  });

  const application = actionsInit({app, pool});
  https.createServer({key, cert}, application).listen(process.env.PORT || 443, function () {
    console.log('Server listening on port '+ (process.env.PORT || 443) +'!');
  });
  http.createServer(application).listen(80);
};
