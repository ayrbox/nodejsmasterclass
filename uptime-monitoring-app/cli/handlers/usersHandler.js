const path = require('path');
const db = require('../../lib/data');
const fileLists = require('../../lib/helpers/listFiles');

const usersDataDir = path.join(process.cwd(), '.data', 'users');

const { printTitle } = require('../utils');

const displayUserInfo = function (userData) {
  const { firstName, lastName, phone, checks } = userData;
  printTitle(`${firstName} ${lastName}`.toUpperCase());
  console.log(`  FirstName : ${firstName}`);
  console.log(`  LastName: ${lastName}`);
  console.log(`  Phone: ${phone}`);
  if (checks) {
    console.log(`  Checks: ${checks.length}`);
  } else {
    console.log(`  Checks: -`);
  }
};

const readUser = function (userId, callback) {
  db.read('users', userId, (err, data) => {
    if (!err && data) {
      callback(data);
      return;
    }
    callback(undefined);
  });
};

const usersHandler = function (_, options) {
  if (options && options.id) {
    const userId = options.id;
    readUser(userId, function (userData) {
      if (userData) displayUserInfo(userData);
      else console.log(`User with id "${userId}" not found.`);
    });
    return;
  }

  // Display all usrs;
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
      readUser(userId, function (userData) {
        if (userData) displayUserInfo(userData);
      });
    });
  });
};

module.exports = usersHandler;
