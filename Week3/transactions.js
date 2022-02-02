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
  `SELECT balance FROM account WHERE account_number =${insertIntoTransfer[0].account_number} OR account_number =${insertIntoTransfer[0].change_number}`,
  function (err, rows) {
    if (err) {
      throw err;
    } else {
      setSendMoney(rows);
    }
  },
);

function setSendMoney(value) {
  balanceValue = value;
  for (let [key, value] of Object.entries(balanceValue[0])) {
    let balanceValue2 = `${value}`;

    async function sendMoney() {
      try {
        const startTransaction = `START TRANSACTION`;
        const commitTransaction = `COMMIT`;
        const rollbackTransaction = 'ROLLBACK';
        await execQuery(startTransaction);
        //Send money
        for (const transfer of insertIntoTransfer) {
          if (Number(balanceValue2) >= insertIntoTransfer[0].amount) {
            const updateSenderBalance =
              Number(balanceValue2) - Number(insertIntoTransfer[0].amount);
            const resultTransfer = await execQuery(
              'INSERT INTO account_changes SET ?',
              transfer,
            );
            const updateSender = await execQuery(
              `UPDATE account SET balance=${updateSenderBalance} WHERE account_number=${insertIntoTransfer[0].account_number}`,
            );
            //Receive money and update receiver
            for (let [key, value] of Object.entries(balanceValue[1])) {
              let balanceValue2 = `${value}`;
              const updateReceiverBalance =
                Number(balanceValue2) + Number(insertIntoTransfer[0].amount);
              const updateReceiver = await execQuery(
                `UPDATE account SET balance=${updateReceiverBalance} WHERE account_number=${insertIntoTransfer[0].change_number}`,
              );
            }
            await execQuery(commitTransaction); //Commit transfer
          } else {
            console.error(
              'The amount you want to send is not available in your account',
            );
            await execQuery(rollbackTransaction); //Rollback process
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
