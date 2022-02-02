const moment = require('moment');
const date = moment(
  'Wed Jan 08 2020 20:20:25 GMT+0100 (GMT+01:00)',
  'ddd MMM DD YYYY HH:mm:ss',
);

let mydate = date.format('YYYY-MM-DD HH:mm:ss');

const insertIntoAccount = [
  {
    account_number: 100,
    balance: 1000,
  },
  {
    account_number: 101,
    balance: 2000,
  },
  {
    account_number: 102,
    balance: 10000,
  },
  {
    account_number: 103,
    balance: 10000,
  },
  {
    account_number: 104,
    balance: 5000,
  },
  {
    account_number: 105,
    balance: 45000,
  },
  {
    account_number: 106,
    balance: 3000,
  },
  {
    account_number: 107,
    balance: 1200,
  },
  {
    account_number: 108,
    balance: 200,
  },
  {
    account_number: 109,
    balance: 12000,
  },
];

const insertIntoTransfer = [
  {
    change_number: 102,
    account_number: 101,
    amount: 200,
    change_date: mydate,
    remark: `The money sended successfully`,
  },
];

module.exports.insertIntoAccount = insertIntoAccount;
module.exports.insertIntoTransfer = insertIntoTransfer;
