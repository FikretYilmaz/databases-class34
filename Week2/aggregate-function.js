const mysql = require('mysql');
const util = require('util');
const {
  allResearchPapers,
  sumOfFemaleResearchPapers,
  avgOfHIndex,
  authorResearches,
  minAndMaxHIndex,
} = require('./helpers/aggregate-functions-helper');

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
execQuery(connection, allResearchPapers);
execQuery(connection, sumOfFemaleResearchPapers);
execQuery(connection, avgOfHIndex);
execQuery(connection, authorResearches);
execQuery(connection, minAndMaxHIndex);
connection.end();
