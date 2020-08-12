const path = require('path');
const db = require('../../lib/data');
const fileLists = require('../../lib/helpers/listFiles');

const usersDataDir = path.join(process.cwd(), '.data', 'users');

const { printTitle, printHorizontalLine } = require('../utils');

const usersHandler = function (command, args) {
  fileLists(usersDataDir, function (listErr, userIds) {
    if (listErr) {
      console.log('Error reading users.', listErr);
      return;
    }

    if (userIds && userIds.length < 0) {
      console.log('Error no users found.');
      return;
    }

    userIds.forEach(userId => {
      db.read('users', userId, (err, data) => {
        if (!err && data) {
          printTitle(`${data.firstName} ${data.lastName}`.toUpperCase());
          console.log(`  FirstName : ${data.firstName}`);
          console.log(`  LastName: ${data.lastName}`);
          console.log(`  Phone: ${data.phone}`);
          if (data.checks) {
            console.log(`  Checks: ${data.checks.length}`);
          } else {
            console.log(`  Checks: -`);
          }
        }
      });
    });
  });
};

module.exports = usersHandler;
