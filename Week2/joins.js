const mysql = require('mysql');
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
connection.connect((err) => {
  if (err) {
    throw error;
  }
  console.log('Mysql Connected');
});

function findAuthorsAndMentors() {
  try {
    connection.query(authorsAndMentors, (err, result, fields) => {
      if (err) {
        throw err;
      }
      console.log(result);
    });
  } catch (error) {
    console.error(error);
  }
}
function findAuthorsAndPublish() {
  try {
    connection.query(authorsAndPublishPapers, (err, result, fields) => {
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

findAuthorsAndMentors();
findAuthorsAndPublish();
