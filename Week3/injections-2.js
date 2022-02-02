var mysql = require('mysql');
const util = require('util');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const execQuery = util.promisify(conn.query.bind(conn));

async function getPopulation(Country, name, code, cb) {
  conn.connect();
  try {
    await execQuery(
      `SELECT Name,Population FROM ${Country} WHERE Name =` +
        conn.escape(name) +
        `and code =` +
        conn.escape(code),
      function (err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error('Not found'));
        cb(null, result);
        conn.end();
      },
    );
  } catch (error) {
    console.error();
  }
  conn.end();
}
getPopulation('country', 'China', 'CHN', console.log);
