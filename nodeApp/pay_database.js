module.exports = function(pool){
  const Database = {
    createTable: function(callback) {
      pool.query('CREATE TABLE IF NOT EXISTS pay_pb\
          ( id VARCHAR(250),\
          amt VARCHAR(20),\
          b_card_or_acc VARCHAR(20),\
          ccy VARCHAR(3),\
          details TEXT,\
          test BOOL,\
          signature VARCHAR(128),\
          state BOOL,\
          message TEXT,\
          ref VARCHAR(128),\
          amount_payd VARCHAR(20),\
          ccy_payd VARCHAR(3),\
          comis VARCHAR(20),\
          code_voucher VARCHAR(20),\
          cardinfo TEXT,\
          date_from DATETIME,\
          date TIMESTAMP,\
          PRIMARY KEY(id)\
    )', function(err, rows, fields){
        console.log('rows = >>>>>>'+rows)
        if (err) throw err;
      });
    },

    add: function(params, callback){
      console.log(params)
      pool.query('INSERT INTO pay_pb SET ? ON DUPLICATE KEY UPDATE `date`=CURRENT_TIMESTAMP', params, function(err, rows, fields){
        if (err) throw err;
        if (rows != undefined){
          console.log('               affectedRows : '+ rows.affectedRows)
        }
        callback();
      });
    },

    getAll: function(callback){
      pool.query("SELECT * FROM pay_pb", function(err, rows, fields){
        if (rows != undefined){
          console.log('AllRows = '+ rows.length)
          // console.log('solution = '+ JSON.stringify( rows[0], null, 4)  )
        }
        if (err){
          throw err;
        }else{
          callback(rows);
        }
      });
    }
  };
  return Database;
};

