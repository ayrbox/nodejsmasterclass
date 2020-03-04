const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const url = require('url');
const db = require('../lib/data');
const helpers = require('../lib/helpers');

let workerInterval = 1000 * 60;
let dataDirectory_;
const makeGatherChecks = require('./makeGatherChecks');

let gatherChecks = function() { };

const loop = function() {
  setInterval(function() {
    gatherChecks();
  }, workerInterval);
}

const makeWorker = function({
  interval,
  dataDirectory,
}) {
  workerInterval = interval || workerInterval;
  dataDirectory_ = dataDirectory;

  gatherChecks = makeGatherChecks({
    db,
    helpers,
    logger: undefined,
    checkFileDirectory: path.join(dataDirectory_, 'checks'),
  });

  const init = function() {
    console.log('Running worker');
    gatherChecks();
    loop();
  }

  return {
    init,
  }
}

module.exports = makeWorker;
