"use strict"
  var c = console;
  var argv = require('minimist')(process.argv.slice(2));
  // c.dir(argv);

// const WORKERS = process.env.NUMBER_OF_PROCESSORS || 1;
const WORKERS = 1;
const throng = require('throng');
throng({
  workers: WORKERS,
  grace: 1000,
  lifetime: Infinity,
  start: start
});



function start(){

  // process.on('uncaughtException', function(err){
  //  console.log('>>> Uncaught exception: '+err);
  // });

  c.log("Здравствуйте, "
    +(process.env['USERNAME'])
    +' '+process.platform
    +(argv['debug'] ? '. Режим отладки включен.' : "")
  );

  // console.log(process.env)

  // var util = require('util');
  // console.log( util.inspect({
  //    akjfh:1,
  //    sdfwf:2,
  //    arr:[1,2,3,4,5]
  //  }, {depth:null})
  // )

  // var beeper = require('beeper');
  //beeper();

  /*const http = require('http');
  const hostname = '127.0.0.1';
  const port = 3000;
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
  });
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });*/


  var mysql = require('mysql');
  var config = require('./config');
  if (process.env.isprod){
    var configDb = config.herokuMysql;
  }else{
    var configDb = config.mysql;
  }
  c.log('################################')
  c.log(configDb)
  var pool  = mysql.createPool(configDb);

  var database = require('./database')(pool);

  /*var moment = require('moment');
  var cheerio = require('cheerio');*/
  // var request = require('request');
  // var req = request.defaults({'proxy':'http://wsproxy.alfa.bank.int:3128'});
  // database.createTable();

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


  var async = require('async');
  var moment = require('moment');
  var events = require('events');

  /*var heapdump = require('heapdump')
  heapdump.writeSnapshot('./log/' + Date.now() + '.heapsnapshot');*/

//   var eventEmitter = new events.EventEmitter();
//
//   eventEmitter.on('scrapped', function(){
//     // console.log(process.memoryUsage().heapUsed / 1000000);
// // heapdump.writeSnapshot('./log/' + Date.now() + '.heapsnapshot');
//     if(process.memoryUsage().heapUsed / 1000000 < 200){
//       var scrapper = require('./scrapper_zombie');
//       scrapper.scrape(database, async, moment, eventEmitter);
//       scrapper = null;
//     }else{
//       if(typeof global.gc == 'function'){
//         global.gc();
//         c.log('################################ erised GC')
//         c.log(process.memoryUsage().heapUsed / 1000000);
//       }
//       var timeoutId = setTimeout(function() {
//           eventEmitter.emit('scrapped');
//         }, 30*60000);
//     }
//
//   });
//
//   eventEmitter.emit('scrapped');

  var path = require('path');
  var bodyParser = require('body-parser');
  var express = require('express');
  var app = express();
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, 'public')));



  app.get('/', function (req, res) {
    res.send('Hello World')
  });

  app.get('/getAll', function (req, res) {
    database.getAll(function(result){
        res.send(result )
    });

    console.log(process.memoryUsage().heapUsed / 1000000);
    if(typeof global.gc == 'function'){
      global.gc();
      c.log('################################ erised GC')
      console.log(process.memoryUsage().heapUsed / 1000000);
    }

  });






  // the very last route '/*' (details at http://ericclemmons.com/angular/using-html5-not-hash-routes/)
  app.get('/*', function(req, res) {
    // AJAX requests are aren't expected to be redirected to the AngularJS app
    if (req.xhr) {
      return res.status(404).send(req.url + ' not found');
    }
    // `sendfile` requires the safe, resolved path to your AngularJS app
    // res.sendfile(path.resolve(__dirname + '/public/index.html'));
    res.sendFile('/404.html', { root: __dirname });
  });
  app.listen(process.env.PORT || 5000, function () {
    console.log('Server listening on port '+ (process.env.PORT || 5000) +'!')
  })

}
