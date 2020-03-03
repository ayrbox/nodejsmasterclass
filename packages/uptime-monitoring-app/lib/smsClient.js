const { inspect } = require('util');
const https = require('https');
const qs = require('querystring');

const makeSMSClient = function({
  fromPhone,
  accountSID,
  authToken,
  apiHost = 'api.twilio.com',
  apiPath = undefined,
}) {

  const apiPath_ = apiPath || `/2010-04-01/Accounts/${accountSID}/Messages.json`;


  const send = function({
    phone,
    message,
  }, callback) {

    if(!phone || !message) {
      callback(new Error('Invalid parameters.'));
      return;
    }

    const payload = qs.stringify({
      From: fromPhone,
      To: phone,
      Body: message, 
    });

    const options = {
      protocol: 'https:',
      hostname: apiHost,
      method: 'POST',
      path: apiPath_,
      auth: `${accountSID}:${authToken}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, function(res) {
      const status = res.statusCode;
      if(status === 200 || status === 201) {
        callback(false);
      } else {
        callback(new Error(`Status code return is ${inspect(status)}`));
      }
    });

    req.on('error', function(err) {
      callback(err);
    });

    req.write(payload);
    req.end();
  }

  return {
    send,
  };
};

module.exports = makeSMSClient;
