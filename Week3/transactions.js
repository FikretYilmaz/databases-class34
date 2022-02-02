const util = require('util');
const mysql = require('mysql');
const {
  insertIntoTransfer,
  insertIntoAccount,
} = require('./transactions-insert-values');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'dbWeek3',
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect();

connection.query(
  `SELECT balance FROM account WHERE account_number =${insertIntoTransfer[0].account_number}`,
  function (err, rows) {
    if (err) {
      throw err;
    } else {
      setValue(rows);
    }
  },
);

function setValue(value) {
  balanceValue = value;
  for (let [key, value] of Object.entries(balanceValue[0])) {
    let balanceValue2 = `${value}`;
    async function sendMoney() {
      try {
        const startTransaction = `START TRANSACTION`;
        const commitTransaction = `COMMIT`;
        const rollbackTransaction = 'ROLLBACK';
        await execQuery(startTransaction);

        for (const transfer of insertIntoTransfer) {
          if (Number(balanceValue2) >= insertIntoTransfer[0].amount) {
            const updateSenderBalance =
              Number(balanceValue2) - Number(insertIntoTransfer[0].amount);
            // const updateReceiverBalance =
            // Number(balanceValue2) + Number(insertIntoTransfer[0].amount);
            //console.log(balanceValue2);
            // console.log(insertIntoAccount[0].amount);
            //console.log(updateSenderBalance);
            const resultTransfer = await execQuery(
              'INSERT INTO account_changes SET ?',
              transfer,
            );
            const updateSender = await execQuery(
              `UPDATE account SET balance=${updateSenderBalance} WHERE account_number=${insertIntoTransfer[0].account_number}`,
            );
            await execQuery(commitTransaction);
          } else {
            await execQuery(rollbackTransaction);
            connection.end();
          }
        }
      } catch (error) {
        console.error(error);
        connection.end();
      }
      connection.end();
    }
    sendMoney();
  }
}
