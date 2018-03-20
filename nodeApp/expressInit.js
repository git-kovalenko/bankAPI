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
// const utils = require('./utils');

module.exports = ({pool}) => {
  const userDatabase = require('./userDatabase')(pool);
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
  app.use(function (err, req, res) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
  });

  app.post('/login', (req, res) => {
    console.log('body', req.body);
    userDatabase.getUser({
      login: req.body.login,
      email: req.body.email,
      password: req.body.password,
    }).then((rows) => {
      if(rows && rows[0]) {
        const { id, login } = rows[0];
        const token = jwt.sign({user: { id, login }}, key, { expiresIn: '20m' });
        res.json({token});
      }else{
        res.status(401).send('Invalid credentials');
      }
    }).catch((error) => {
      console.error(error);
      res.status(500).send('internal server error');
    });
  });

  const application = actionsInit({app, pool});
  https.createServer({key, cert}, application).listen(process.env.PORT || 443, function () {
    console.log('Server listening on port '+ (process.env.PORT || 443) +'!');
  });
  http.createServer(application).listen(80);
};
