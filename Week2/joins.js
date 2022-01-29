const mysql = require('mysql');
const util = require('util');

const {
  authorsAndMentors,
  authorsAndPublishPapers,
} = require('./helpers/joins-helpers');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'authors',
});
const execQuery = (connection, query) => {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    console.table(results);
  });
};
connection.connect();
execQuery(connection, authorsAndMentors);
execQuery(connection, authorsAndPublishPapers);
connection.end();
