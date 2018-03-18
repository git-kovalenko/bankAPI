const argv = require('minimist')(process.argv.slice(2));
console.log(`Hello, ${process.env['USERNAME']} ${process.platform}
  ${argv.dev ? ' Application in development mode.' : ''}`
);

if(argv.dev) {
  main();
} else {
  const WORKERS = process.env.NUMBER_OF_PROCESSORS || 1;
  const throng = require('throng');
  throng({
    workers: WORKERS,
    grace: 1000,
    lifetime: Infinity,
    start: main
  });
}

function main(){
  process.on('uncaughtException', function(error){
    console.log('>>> Uncaught exception: ');
    console.error(error);
  });
  const config = process.env.PRODUCTION ? require('./config_prod') : require('./config_dev');
  process.configDb =  config.mysql;
  const mysql = require('mysql');
  const pool  = mysql.createPool(process.configDb);

  require('./setEnvironment')({pool});
  require('./expressInit.js')({pool});

}
