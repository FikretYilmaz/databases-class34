const util = require('util');
const mysql = require('mysql');
const {
  dropDatabase,
  createDatabase,
  connectAuthor,
  authorsTable,
  addColumn,
  addForeignKey,
} = require('./helpers/keys-helpers.js');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();
  try {
    await execQuery(dropDatabase);
    await execQuery(createDatabase);
    await execQuery(connectAuthor);
    await execQuery(authorsTable);
    await execQuery(addColumn);
    await execQuery(addForeignKey);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
