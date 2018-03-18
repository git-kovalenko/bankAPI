module.exports = ({pool}) => {
  const merchant_database = require('./merchant_database')(pool);
  const pay_database = require('./pay_database')(pool);

  if (!process.conf) {
    process.conf = {};
  }
  const getMerchant = (merchantId) => {
    merchantId = merchantId || 133384;
    merchant_database.getById(merchantId)
      .then((rows) => {
        process.conf.merchant = rows[0] ? rows[0] : null;

      });
  };
  getMerchant();

  pay_database.tableExist((exist) => {
    if (!exist) {
      pay_database.createTable(
        (rows) => console.log('Table created: ', JSON.stringify(rows))
      );
    }
  });

  merchant_database.tableExist((exist) => {
    if (!exist) {
      merchant_database.createTable(
        (rows) => console.log('Table created: ', JSON.stringify(rows))
      );
    }
  });

};
