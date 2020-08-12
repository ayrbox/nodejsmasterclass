const db = require('../../lib/data');
const usersHandler = function (command, args) {
  db.read('users', '2021231231', (err, data) => {
    console.log(data, err);
  });
};

module.exports = usersHandler;
