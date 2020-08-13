const path = require('path');
const db = require('../../lib/data');
const fileLists = require('../../lib/helpers/listFiles');

const checksDataDir = path.join(process.cwd(), '.data', 'checks');

const { printTitle } = require('../utils');

const displayCheckInfo = function (checkData) {
  const {
    id,
    protocol,
    url,
    method,
    successCodes,
    timeouts,
    state,
    lastChecked,
  } = checkData;

  printTitle(`${protocol}://${url}`.toUpperCase());
  console.log(`  Id: ${id}`);
  console.log(`  Protocol: ${protocol}`);
  console.log(`  Url: ${url}`);
  console.log(`  Method: ${method}`);
  console.log(`  Success Code: ${successCodes.join(', ')}`);
  console.log(`  Timeouts: ${timeouts} second(s)`);

  console.log(`  State: ${state || '-'}`);
  if (lastChecked) {
    console.log(`  Last Checked: ${new Date(lastChecked).toISOString()}`);
  } else {
    console.log(`  Last Checked: -`);
  }
};

const readChecks = function (checkId, callback) {
  db.read('checks', checkId, (err, data) => {
    if (!err && data) {
      callback(data);
      return;
    }
    callback(undefined);
  });
};

const checksHandler = function (_, options) {
  if (options && options.id) {
    const checkId = options.id;
    readChecks(checkId, function (checkData) {
      if (checkData) displayCheckInfo(checkData);
      else console.log(`Check with id "${checkId}" not found.`);
    });
    return;
  }

  // Display all usrs;
  fileLists(checksDataDir, function (listErr, checksIds) {
    if (listErr) {
      console.log('Error reading users.', listErr);
      return;
    }

    if (checksIds && checksIds.length < 0) {
      console.log('No checks found.');
      return;
    }

    checksIds.forEach(checkId => {
      readChecks(checkId, function (checkData) {
        if (checkData) displayCheckInfo(checkData);
      });
    });
  });
};

module.exports = checksHandler;
