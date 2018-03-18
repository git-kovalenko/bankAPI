module.exports = function(pool){
  const TABLE_NAME = 'merchant';
  return {
    createTable: (callback) => {
      pool.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
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
      pool.query(`INSERT INTO ${TABLE_NAME} SET ? ON DUPLICATE KEY UPDATE timestamp=CURRENT_TIMESTAMP`, params, (err, rows) =>{
        if (err) throw err;
        callback(rows);
      });
    },

    getById: function(merchantId){
      return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, merchantId, function(err, rows){
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
      pool.query(`SELECT * FROM ${TABLE_NAME}`, function(err, rows){
        if (err){
          throw err;
        }else{
          callback(rows);
        }
      });
    },

    tableExist: function(callback){
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
