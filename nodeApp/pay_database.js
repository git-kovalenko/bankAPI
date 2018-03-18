module.exports = (pool) => {
  const TABLE_NAME = 'pay_pb';
  return {
    createTable: (callback) => {
      pool.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
          ( id VARCHAR(250),
          amt VARCHAR(20),
          b_card_or_acc VARCHAR(20),
          ccy VARCHAR(3),
          details TEXT,
          test BOOL,
          signature VARCHAR(128),
          state BOOL,
          message TEXT,
          ref VARCHAR(128),
          amount_payd VARCHAR(20),
          ccy_payd VARCHAR(3),
          comis VARCHAR(20),
          code_voucher VARCHAR(20),
          cardinfo TEXT,
          date_from DATETIME,
          date TIMESTAMP,
          PRIMARY KEY(id)
    )`, (error, rows) => {
        if (error){
          throw error;
        }else if (callback) {
          callback(rows);
        }
      });
    },

    add: (params, callback) => {
      pool.query(`INSERT INTO ${TABLE_NAME} SET ? ON DUPLICATE KEY UPDATE date=CURRENT_TIMESTAMP`, params, function(err, rows){
        if (err) throw err;
        console.log(TABLE_NAME, ' affectedRows : '+ (rows ? rows.affectedRows : null));
        callback();
      });
    },

    getAll: (callback) => {
      pool.query(`SELECT * FROM ${TABLE_NAME}`, function(error, rows){
        if (rows !== undefined){
          console.log('selected rows: '+ rows.length);
        }
        if (error){
          throw error;
        }else if (callback) {
          callback(rows);
        }
      });
    },

    tableExist: (callback) => {
      pool.query(`SELECT * FROM information_schema.TABLES
                  WHERE (TABLE_SCHEMA = '${process.configDb.database}'
                  AND (TABLE_NAME = '${TABLE_NAME}'))`, (error, rows) => {
        if (error){
          throw error;
        }else {
          callback(!!rows.length);
        }
      });
    }
  };
};

