const util = require('util');
const mysql = require('mysql');
const {
  createResearchPaperDB,
  createResearchPapersAuthors,
  insertIntoAuthor,
  insertResearchPapers,
  insertIntoAuthorsAndPapers,
  authorAndPaperValues,
} = require('./helpers/relationships-helpers');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'authors',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function addResearchPaper() {
  connection.connect();
  try {
    await execQuery(createResearchPaperDB);
    await execQuery(createResearchPapersAuthors);

    for (const author of insertIntoAuthor) {
      const resultAuthor = await execQuery('INSERT INTO author SET ?', author);
    }
    for (const paper of insertResearchPapers) {
      const resultPaper = await execQuery(
        'INSERT INTO research_Papers SET ?',
        paper,
      );
    }
    await execQuery(insertIntoAuthorsAndPapers, [authorAndPaperValues]);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

addResearchPaper();
