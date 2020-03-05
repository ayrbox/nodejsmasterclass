const http = require('http');
const https = require('https');
const urlModule = require('url');

const performCheck = function({
  id,
  protocol,
  url,
  method,
  timeouts,
  successCodes,
  state,
  lastChecked,
}, callback) {
  const checkOutcome = {
    error: undefined,
    responseCode: undefined,
  };

  let outcomeSent = false;
  
  const { hostname, path }= urlModule.parse(`${protocol}://${url}`, true);

  const requestDetails = {
    protocol: `${protocol}:`,
    hostname,
    method,
    path,
    timeout: timeouts * 1000,
  };

  const httpModule = protocol === 'http' ? http : https;

  const req = httpModule.request(requestDetails, function(res) {
    checkOutcome.responseCode = res.statusCode;
    if(!outcomeSent) {
      callback(checkOutcome);
      outcomeSent = true;
    }
  });

  req.on('error', function(e) {
    checkOutcome.error = {
      error: true,
      value: e,
    };

    if(!outcomeSent) {
      callback(checkOutcome);
      outcomeSent = true;
    }
  });

  req.on('timeout', function(e) {
    checkOutcome.error = {
      error: true,
      value: 'Timeout',
    };

    if(!outcomeSent) {
      callback(checkOutcome);
      outcomeSent = true;
    }
  });

  req.end();
};

module.exports = performCheck;
