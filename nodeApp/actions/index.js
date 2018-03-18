const util = require('util');
const Utils = require('../utils');
const xml2js = require('xml2js');
const request = require('request');
const path = require('path');

module.exports = ({app, pool}) => {
  const xmlParser = new xml2js.Parser({
    explicitArray: false,
    trim: true,
  });
  const pay_database = require('../pay_database')(pool);
  const merchant_database = require('../merchant_database')(pool);
  app.get('/', function (req, res) {
    res.send('Hello World');
  });

  app.get('/setMerchant', (req, res) => {
    const merchant = {
      id: '',
      password: '',
      name: 'card',
      cardNumber: '',
    };
    merchant_database.add(merchant, (rows) => {
      res.send(rows);
    });
  });

  app.post('/ballance', (req, res) => {
    if (!req.session.merchant) {
      req.session.merchant = process.conf.merchant;
    }
    const cardNumber = req.session.merchant.cardNumber;
    const merchantId = req.session.merchant.id;
    const data = {
      oper: [ 'cmt' ],
      wait: [ 0 ],
      test: [ 0 ],
      payment: [{
        '$': { id: '' },
        prop: [
          { '$': { name: 'cardnum', value: cardNumber } },
          { '$': { name: 'country', value: 'UA' } }
        ]
      }]
    };

    const builder = new xml2js.Builder({ renderOpts: { pretty: false, indent: '', newline: '' } });
    const dataXML = builder.buildObject(data);
    const regex = /<root[^>]*>([\s\S]*?)<\/root>/gmi;
    const dataContent = regex.exec(dataXML)[1];
    const signature = Utils.makeSignature(dataContent, req.session.merchant.password);

    let payload = {
      request: {
        '$': { version: '1.0' },
        merchant: [{
          id: [ merchantId ],
          signature: [ signature ],
        }],
        data: [data]
      }
    };

    request(
      {
        method: 'POST',
        preambleCRLF: true,
        postambleCRLF: true,
        uri: 'https://api.privatbank.ua/p24api/balance',
        body: builder.buildObject(payload),
      },
      function (error, response, body) {
        if (error) {
          return console.error('upload failed:', error);
        }
        // console.log('Upload successful!  Server responded with:', body);
        xmlParser.parseString(body, function (err, result) {
          res.send(result.response.data);
        });
      }
    );

  });

  app.post('/payMerchantToPrivat', (req, res) => {
    if (!req.session.merchant) {
      req.session.merchant = process.conf.merchant;
    }
    const cardNumber = req.body.cardNumber;
    const amount = req.body.amount;
    const details = req.body.details;
    const merchantId = req.session.merchant.id;
    const paymentId = Utils.generateId();
    const data = {
      oper: [ 'cmt' ],
      wait: [ 0 ],
      test: [ 0 ],
      payment: [{
        '$': { id: paymentId },
        prop: [
          { '$': { name: 'b_card_or_acc', value: cardNumber } },
          { '$': { name: 'amt', value: amount } },
          { '$': { name: 'ccy', value: 'UAH' } },
          { '$': { name: 'details', value: details } },
        ]
      }]
    };

    const builder = new xml2js.Builder({ renderOpts: { pretty: false, indent: '', newline: '' } });
    const dataXML = builder.buildObject(data);
    const regex = /<root[^>]*>([\s\S]*?)<\/root>/gmi;
    const dataContent = regex.exec(dataXML)[1];
    // console.log(dataContent);
    const signature = Utils.makeSignature(dataContent, req.session.merchant.password);

    let payload = {
      request: {
        '$': { version: '1.0' },
        merchant: [{
          id: [ merchantId ],
          signature: [ signature ],
        }],
        data: [data]
      }
    };

    request(
      {
        method: 'POST',
        preambleCRLF: true,
        postambleCRLF: true,
        uri: 'https://api.privatbank.ua/p24api/pay_pb',
        body: builder.buildObject(payload),
      },
      function (error, response, body) {
        if (error) {
          console.error('upload failed:', error);
          res.send(error);
        }
        xmlParser.parseString(body, (err, result) => {
          const payment = result.response.data.payment.$;
          if(payment) {
            pay_database.add(payment,  () => {
              res.send(payment);
            });
          }else{
            res.send(result);
          }
        });
      }
    );

  });


  app.post('/test', (req, res) => {
    // console.log(req);
    // res.send(req.body);
    res.send(util.inspect(req));
  });


  app.get('/getAll', function (req, res) {
    pay_database.getAll(function(result){
      res.send(result );
    });

  });

  app.get('/addPayment', function (req, res) {
    const params = {
      id: Math.random().toString(36).slice(2),
      amount: 10
    };
    pay_database.add(params,  function(result){
      res.send(result );
    });
  });











  // the very last route '/*' (details at http://ericclemmons.com/angular/using-html5-not-hash-routes/)
  app.get('/*', function(req, res) {
    // AJAX requests are aren't expected to be redirected to the AngularJS app
    if (req.xhr) {
      return res.status(404).send(req.url + ' not found');
    }
    res.sendFile(path.resolve(__dirname + '../../404.html'));
  });
  return app;
};

