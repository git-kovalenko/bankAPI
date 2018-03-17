module.exports = function(pool){
  const Database = {
    createTable: function(callback) {
      pool.query(`CREATE TABLE IF NOT EXISTS merchant
          ( id VARCHAR(25),
          password VARCHAR(256),
          name VARCHAR(256),
          cardNumber VARCHAR(16),
          timestamp TIMESTAMP,
          PRIMARY KEY(id)
    )`, (err, rows) => {
        if (err) throw err;
        if(callback) {
          callback(rows);
        }
      });
    },

    add: function(params, callback){
      console.log(params)
      pool.query('INSERT INTO merchant SET ? ON DUPLICATE KEY UPDATE `timestamp`=CURRENT_TIMESTAMP', params, function(err, rows, fields){
        if (err) throw err;
        if (rows){
          console.log('          affectedRows : '+ rows.affectedRows);
        }
        callback(rows);
      });
    },

    getById: function(merchantId){
      return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM merchant WHERE `id` = ?', merchantId, function(err, rows){
          if (err){
            reject(err);
            throw err;
          }else{
            resolve(rows);
          }
        });
      });
    },

    getAll: function(callback){
      pool.query('SELECT * FROM merchant', function(err, rows){
        if (err){
          throw err;
        }else{
          console.log('AllRows = '+ rows.length);
          callback(rows);
        }
      });
    }
  };
  return Database;
};
