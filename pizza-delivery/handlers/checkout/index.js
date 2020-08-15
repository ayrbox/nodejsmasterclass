const path = require("path");
const { DATADIR, LOG_DIR } = require("../../context");
const makeRender = require("../../lib/makeRender");
const logger = require("../../lib/makeLogger")("handlers:cart");

const fileLogger = require("../../lib/makeFileLogger")(LOG_DIR, "orders");

const makeDataHandler = require("../../lib/makeDataHandlers");
const makeRandomString = require("../../lib/makeRandomString");
const makeCheckoutPageHandler = require("./makeCheckoutPageHandler");
const makeCheckoutCompletePageHandler = require("./makeCheckoutCompletePageHandler");

const makeCheckout = require("./makeCheckout");
const randomString = makeRandomString(20);

const dbCart = makeDataHandler(DATADIR, "carts");
const dbOrder = makeDataHandler(DATADIR, "order");

// Page UI
const viewsDir = path.join(process.cwd(), "views");
const render = makeRender(viewsDir);

const checkoutPageHandler = makeCheckoutPageHandler(render, {});
const checkoutCompletePageHandler = makeCheckoutCompletePageHandler(render, {});

const checkout = makeCheckout({
  dbCart,
  dbOrder,
  randomString,
  logger,
  fileLogger
});

module.exports = {
  checkout,
  checkoutPageHandler,
  checkoutCompletePageHandler
};
