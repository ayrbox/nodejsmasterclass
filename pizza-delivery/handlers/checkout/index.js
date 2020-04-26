const { DATADIR } = require("../../context");

const logger = require("../../lib/makeLogger")("handlers:cart");
const makeDataHandler = require("../../lib/makeDataHandlers");
const makeRandomString = require("../../lib/makeRandomString");

const makeCheckout = require("./makeCheckout");
const randomString = makeRandomString(20);

const dbCart = makeDataHandler(DATADIR, "carts");
const dbOrder = makeDataHandler(DATADIR, "order");

const checkout = makeCheckout({
  dbCart,
  dbOrder,
  randomString,
  logger
});

module.exports = {
  checkout
};
