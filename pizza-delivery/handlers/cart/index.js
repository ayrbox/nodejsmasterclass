const { DATADIR } = require('../../context');
const logger = require('../../lib/makeLogger')('handlers:cart');

const makeDataHandler = require('../../lib/makeDataHandlers');

const makeAddToCart = require('./makeAddToCart');

const db = makeDataHandler(DATADIR, 'carts');
const dbMenu = makeDataHandler(DATADIR, 'menu');

const addToCart = makeAddToCart({ db, dbMenu, logger });

module.exports = {
  addToCart,
};
