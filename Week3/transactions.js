const util = require('util');
const mysql = require('mysql');
const {
  insertIntoTransfer,
  insertIntoTransfer2,
} = require('./transactions-insert-values');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'dbWeek3',
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect();
async function getBalanceAndAmount(insertQuery) {
  const input1 = insertQuery[0].account_number;
  const input2 = insertQuery[0].change_number;
  const query = `SELECT balance FROM account WHERE account_number =? OR account_number =?`;
  await execQuery(query, [input1, input2], function (err, rows) {
    if (err) {
      throw err;
    } else {
      setSendMoney(rows);
    }
  });
}

function setSendMoney(value) {
  balanceValue = value;
  for (let [key, value] of Object.entries(balanceValue[0])) {
    let balanceValue2 = `${value}`;

    async function sendMoney(arrayOfInsertData) {
      try {
        const startTransaction = `START TRANSACTION`;
        const commitTransaction = `COMMIT`;
        const rollbackTransaction = 'ROLLBACK';
        await execQuery(startTransaction);
        //Send money
        for (const transfer of arrayOfInsertData) {
          if (Number(balanceValue2) >= arrayOfInsertData[0].amount) {
            const updateSenderBalance =
              Number(balanceValue2) - Number(arrayOfInsertData[0].amount);
            const resultTransfer = await execQuery(
              'INSERT INTO account_changes SET ?',
              transfer,
            );
            const input = updateSenderBalance;
            const input2 = arrayOfInsertData[0].account_number;
            const updateSender = await execQuery(
              `UPDATE account SET balance=` +
                connection.escape(input) +
                ` WHERE account_number=` +
                connection.escape(input2),
            );
            //Receive money and update receiver
            for (let [key, value] of Object.entries(balanceValue[1])) {
              let balanceValue2 = `${value}`;
              const updateReceiverBalance =
                Number(balanceValue2) + Number(arrayOfInsertData[0].amount);
              const input1 = updateReceiverBalance;
              const input2 = arrayOfInsertData[0].change_number;
              const updateReceiver = await execQuery(
                `UPDATE account SET balance=` +
                  connection.escape(input1) +
                  ` WHERE account_number=` +
                  connection.escape(input2),
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
    //sendMoney(insertIntoTransfer2);
    sendMoney(insertIntoTransfer);
  }
}

//getBalanceAndAmount(insertIntoTransfer2);
getBalanceAndAmount(insertIntoTransfer);
