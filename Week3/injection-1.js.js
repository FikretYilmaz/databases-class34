const mysql = require('mysql');
const util = require('util');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

function getPopulation(Country, name, code, cb) {
  conn.connect();
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result);
      conn.end();
    },
  );
}

getPopulation('country', 'China', "CHN 'OR' 1=1", console.log);
