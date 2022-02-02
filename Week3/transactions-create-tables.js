const util = require('util');
const mysql = require('mysql');
const {
  insertIntoAccount,
  insertIntoTransfer,
} = require('./transactions-insert-values');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

const dropDatabase = 'DROP DATABASE IF EXISTS dbWeek3';
const createDatabase = 'CREATE DATABASE dbWeek3';

const connectDbWeek3 = 'USE dbWeek3';

const accountTable = `
CREATE TABLE IF NOT EXISTS account(
  account_number INT,
  balance INT,
  PRIMARY KEY (account_number));`;

const account_changes = `
CREATE TABLE IF NOT EXISTS account_changes(
  change_number INT,
  account_number INT,
  amount INT,
  change_date DATE,
  remark VARCHAR(300),
  FOREIGN KEY (account_number) REFERENCES account (account_number));`;

async function seedDatabase() {
  connection.connect();
  try {
    await execQuery(dropDatabase);
    await execQuery(createDatabase);
    await execQuery(connectDbWeek3);
    await execQuery(accountTable);
    await execQuery(account_changes);

    for (const account of insertIntoAccount) {
      const resultAccount = await execQuery(
        'INSERT INTO account SET ?',
        account,
      );
    }
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
