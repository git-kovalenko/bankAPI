const argv = require('minimist')(process.argv.slice(2));
console.log(`Hello, ${process.env['USERNAME']} ${process.platform}
  ${argv['debug'] ? '. Attention, debug mode.' : ''}`
);

// const WORKERS = process.env.NUMBER_OF_PROCESSORS || 1;
/*
const WORKERS = 1;
const throng = require('throng');
throng({
  workers: WORKERS,
  grace: 1000,
  lifetime: Infinity,
  start: start
});
*/

start();

function start(){
  // process.on('uncaughtException', function(err){
  //  console.log('>>> Uncaught exception: '+err);
  // });
  const config = process.env.isprod ? require('./config_prod') : require('./config_dev');
  process.configDb =  config.mysql;
  const mysql = require('mysql');
  const pool  = mysql.createPool(process.configDb);

  require('./setEnvironment')({pool});
  require('./expressInit.js')({pool});

}
