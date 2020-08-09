const path = require("path");
const { DATADIR } = require("../../context");
const makeRender = require("../../lib/makeRender");
const logger = require("../../lib/makeLogger")("handlers:cart");
const makeDataHandler = require("../../lib/makeDataHandlers");
const makeRandomString = require("../../lib/makeRandomString");
const makeCheckoutPageHandler = require("./makeCheckoutPageHandler");

const makeCheckout = require("./makeCheckout");
const randomString = makeRandomString(20);

const dbCart = makeDataHandler(DATADIR, "carts");
const dbOrder = makeDataHandler(DATADIR, "order");

// Page UI
const viewsDir = path.join(process.cwd(), "views");
const render = makeRender(viewsDir);

const checkoutPageHandler = makeCheckoutPageHandler(render, {});

const checkout = makeCheckout({
  dbCart,
  dbOrder,
  randomString,
  logger
});

module.exports = {
  checkout,
  checkoutPageHandler
};
