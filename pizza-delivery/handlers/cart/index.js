const { DATADIR } = require("../../context");
const logger = require("../../lib/makeLogger")("handlers:cart");

const makeDataHandler = require("../../lib/makeDataHandlers");

const makeAddCartItem = require("./makeAddCartItem");
const makeUpdateCartItem = require("./makeUpdateCartItem");
const makeDeleteCartItem = require("./makeDeleteCartItem");
const makeGetCart = require("./makeGetCart");
const makeDeleteCart = require("./makeDeleteCart");

const db = makeDataHandler(DATADIR, "carts");
const dbMenu = makeDataHandler(DATADIR, "menu");

const addCartItem = makeAddCartItem({ db, dbMenu, logger });
const updateCartItem = makeUpdateCartItem({
  db,
  dbMenu,
  logger
});

const getCart = makeGetCart({ db });
const deleteCart = makeDeleteCart({ db });

const deleteCartItem = makeDeleteCartItem({
  db,
  dbMenu,
  logger
});

module.exports = {
  addCartItem,
  updateCartItem,
  deleteCartItem,
  getCart,
  deleteCart
};
