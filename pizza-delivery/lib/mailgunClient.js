const https = require('https');
const { StringDecoder } = require('string_decoder');
const qs = require('querystring'); 
const { mailgun } = require('../config');

const { apiKey, host, domain, from } = mailgun;

const sendEmail = function({
  to,
  subject,
  text,
}, callback) {

  const apiPath = `/v3/${domain}`;

  const payload = qs.stringify({
    from,
    to,
    subject,
    text,
  });

  const options = {
    protocol: "https:",
    hostname: host,
    method: "POST",
    path: apiPath,
    auth: `${apiKey}:`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(payload)
    }
  };

  const req = https.request(options, function(res) {
    const status = res.statusCode;
    res.on('data', buffer => {
      const decoder = new StringDecoder('utf-8');
      const data = decoder.write(buffer);

      const err = (status === 200 || status === 201) ?
        false:
        new Error('Error sending email');

      callback(err, JSON.parse(data));
    });
  });

  req.on('error', function(err) {
    callback(err, null);
  });

  req.write(payload);
  req.end();
};
