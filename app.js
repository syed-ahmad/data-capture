const csv = require('csv-parser');
const fs = require('fs');
const axios = require('axios');

let accountDetailUrl = "http://localhost:8007/Ruc/Account/Detail";
let accounts = [];

fs.createReadStream('accounts.csv')
  .pipe(csv())
  .on('data', (row) => {
    accounts.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    initDataRequest(accounts);
  });

function initDataRequest(acc) {
  accounts.forEach(acc => {
    axios.post(accountDetailUrl, { accountNumber: acc.AccountId})
    .then(res => {
      console.log(res.statusCode);
    })
    .catch(err => console.log(err));
  });
}
