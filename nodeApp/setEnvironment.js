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
        const row = rows[0] ? rows[0] : null;
        // console.log(row)
        process.conf.merchant = row;
      });
  };

  getMerchant();

  // pay_database.createTable();
  // merchant_database.createTable(
  //   (rows) => console.log(rows)
  // );

};
