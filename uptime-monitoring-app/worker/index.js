const path = require('path');
const fs = require('fs');
const db = require('../lib/data');
const helpers = require('../lib/helpers');
const logger = require('../lib/logger');

let workerInterval = 1000 * 60;
let dataDirectory_;
const makeGatherChecks = require('./makeGatherChecks');
const makeAlertUser = require('./makeAlertUser');

let gatherChecks = function () {};

const loop = function () {
  setInterval(function () {
    gatherChecks();
  }, workerInterval);
};

const makeWorker = function ({ interval, dataDirectory, smsClient }) {
  workerInterval = interval || workerInterval;
  dataDirectory_ = dataDirectory;

  gatherChecks = makeGatherChecks({
    db,
    helpers,
    logger: undefined,
    checkFileDirectory: path.join(dataDirectory_, 'checks'),
    alertUser: makeAlertUser(smsClient),
  });

  const init = function () {
    logger.info('Running worker');
    gatherChecks();
    loop();
  };

  return {
    init,
  };
};

module.exports = makeWorker;
