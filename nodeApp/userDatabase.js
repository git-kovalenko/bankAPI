module.exports = function(pool){
  const TABLE_NAME = 'users';
  return {
    createTable: (callback) => {
      pool.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
        ( id VARCHAR(25),
        login VARCHAR(256),
        password VARCHAR(256),
        email VARCHAR(256),
        name VARCHAR(256),
        timestamp TIMESTAMP,
        PRIMARY KEY(id)
      )`, (err, rows, fields) => {
        if (err) throw err;
        if(callback) {
          callback(rows);
          console.log(fields);
        }
      });
    },

    add: function(params, callback){
      pool.query(`INSERT INTO ${TABLE_NAME} SET ? ON DUPLICATE KEY UPDATE timestamp=CURRENT_TIMESTAMP`, params, (err, rows) =>{
        if (err) throw err;
        callback(rows);
      });
    },

    getUser: function(params){
      return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${TABLE_NAME} WHERE
                    (login=${pool.escape(params.login)} OR email=${pool.escape(params.email)})
                    AND password=${pool.escape(params.password)}`, function(err, rows){
          if (err){
            reject(err);
            throw err;
          }else{
            resolve(rows);
          }
        });

      });
    },

    getById: function(userId){
      return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, userId, function(err, rows){
          if (err){
            reject(err);
            throw err;
          }else{
            resolve(rows);
          }
        });
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
