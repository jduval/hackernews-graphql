const mysql = require('mysql');
const config = require('./constants').config.mysql;

const connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database,
});

module.exports = {
  /**
   * MySQL query.
   *
   * @param {object || string} params - If params is a string, it's only the MySQL query.
   * @param {string} params.sql - MySQL query.
   * @param {string || array} params.args - MySQL query arguments escaped.
   */
  query: (params) =>
    new Promise((resolve, reject) => {
      const sql = params.sql ? params.sql : params;
      const args = ((Array.isArray(params.args) && params.args.length > 0) || params.args) ? params.args : null;

      connection.query(sql, args, (err, result) => {
        if (err)
          return reject(err);
        resolve(result);
      });
    })
};
