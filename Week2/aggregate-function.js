const mysql = require('mysql');
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
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Mysql Connected');
});

function findAllResearchPapers() {
  try {
    connection.query(allResearchPapers, (err, result, fields) => {
      if (err) {
        throw err;
      }
      console.table(result);
    });
  } catch (error) {
    console.error(error);
  }
}
function findSumOfFemaleResearchPapers() {
  try {
    connection.query(sumOfFemaleResearchPapers, (err, result, fields) => {
      if (err) {
        throw err;
      }
      console.table(result);
    });
  } catch (error) {
    console.error(error);
  }
}
function findAvgOfHIndex() {
  try {
    connection.query(avgOfHIndex, (err, result, fields) => {
      if (err) {
        throw err;
      }
      console.table(result);
    });
  } catch (error) {
    console.error(error);
  }
}

function findAuthorResearches() {
  try {
    connection.query(authorResearches, (err, result, fields) => {
      if (err) {
        throw err;
      }
      console.table(result);
    });
  } catch (error) {
    console.error(error);
  }
}
function findMinAndMaxHIndex() {
  try {
    connection.query(minAndMaxHIndex, (err, result, fields) => {
      if (err) {
        throw err;
      }
      console.table(result);
    });
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}
findAllResearchPapers();
findSumOfFemaleResearchPapers();
findAvgOfHIndex();
findAuthorResearches();
findMinAndMaxHIndex();
