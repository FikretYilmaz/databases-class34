const dropDatabase = 'DROP DATABASE IF EXISTS authors';
const createDatabase = 'CREATE DATABASE authors';
const connectAuthor = 'USE authors';
const authorsTable = `    
  CREATE TABLE IF NOT EXISTS author(
  author_no INT PRIMARY KEY,
  author_name VARCHAR(300),university VARCHAR(500),
  date_of_birth DATE,
  h_index INT,
  gender ENUM('m', 'f')
  );`;
const addColumn = `
  ALTER TABLE author
  ADD mentor INT`;
const addForeignKey = `
  ALTER TABLE author
  ADD FOREIGN KEY(mentor)
  REFERENCES author(author_no)`;

module.exports.dropDatabase = dropDatabase;
module.exports.createDatabase = createDatabase;
module.exports.connectAuthor = connectAuthor;
module.exports.authorsTable = authorsTable;
module.exports.addColumn = addColumn;
module.exports.addForeignKey = addForeignKey;
