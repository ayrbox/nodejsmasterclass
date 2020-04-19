const https = require("https");
const { StringDecoder } = require("string_decoder");
const qs = require("querystring");

const { stripe } = require("../config");

const { url, key, currency, paymentMethods } = stripe;

const createPayment = function({
  orderId,
  customerId,
  amount,
  confirm = false,
}, callback) {
  const apiPath = "/v1/payment_intents";

  const payload = qs.stringify({
    amount: amount * 100,
    currency,
    "payment_method_types[]": [paymentMethods],
    payment_method: "pm_card_visa_debit",
    confirm,
    description: customerId,
    'metadata[order_id]': orderId,
  });

  const options = {
    protocol: "https:",
    hostname: url,
    method: "POST",
    path: apiPath,
    auth: `${key}:`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(payload)
    }
  };

  const req = https.request(options, function(res) {
    const status = res.statusCode;
    res.on("data", responseBuffer => {
      const decoder = new StringDecoder("utf-8");
      const data = decoder.write(responseBuffer);
      console.log('data>>>>>>>>>', data);

      const err = (status === 200 || status === 201) ?
        false :
        new Error(`Status code returned is ${status}`);
      callback(err, JSON.parse(data)); // TODO: user utils function to parse
    });
  });

  req.on("error", function(err) {
    callback(err, null);
  });

  req.write(payload);
  req.end();
};

const confirmPayment = function(
  { paymentId, paymentMethod = "pm_card_visa" },
  callback
) {
  const apiPath = `/v1/payment_intents/${paymentId}/confirm`;

  const payload = qs.stringify({
    payment_method: paymentMethod
  });

  const options = {
    protocol: "https:",
    hostname: url,
    method: "POST",
    path: apiPath,
    auth: `${key}:`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(payload)
    }
  };

  const req = https.request(options, function(res) {
    const status = res.statusCode;

    res.on("data", responseBuffer => {
      const decoder = new StringDecoder("utf-8");
      const resData = decoder.write(responseBuffer);

      const err =
        status === 200 || status === 201
          ? false
          : new Error(`Status code returned is ${status}`);
      callback(err, resData);
    });
  });

  req.on("error", function(err) {
    callback(err);
  });

  req.write(payload);
  req.end();
};

const cancelPayment = function({ paymentId }, callback) {
  const apiPath = `/v1/payment_intents/${paymentId}/cancel`;

  const options = {
    protocol: "https:",
    hostname: url,
    method: "POST",
    path: apiPath,
    auth: `${key}:`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const req = https.request(options, function(res) {
    const status = res.statusCode;
    res.on("data", responseBuffer => {
      const decoder = new StringDecoder("utf-8");
      const resData = decoder.write(responseBuffer);

      const err =
        status === 200 || status === 201
          ? false
          : new Error(`Status code return is ${status}.`);

      callback(err, resData);
    });
  });
  req.on("error", function(err) {
    callback(err);
  });
  req.end();
};

module.exports = {
  createPayment,
  confirmPayment,
  cancelPayment
};
