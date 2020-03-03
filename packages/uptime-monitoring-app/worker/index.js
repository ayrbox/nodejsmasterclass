const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const url = require('url');
const db = require('../lib/data');
const helpers = require('../lib/helpers');

let workerInterval = 1000 * 60;
const makeGatherChecks = require('./makeGatherChecks');

const gatherChecks = makeGatherChecks({
  db,
  helpers,
  logger: undefined
});

const loop = function() {
  setInterval(function() {
    gatherChecks();
  }, workerInterval);
}

const makeWorker = function({
  interval,
} = {
  interval: workerInterval
}) {
  workerInterval = interval;
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
