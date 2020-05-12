const { DATADIR } = require('../../context');
const logger = require('../../lib/makeLogger')('handlers:users');

const makeDataHandler = require('../../lib/makeDataHandlers');
const makeMenuList = require('./makeListMenu');
const makeGetMenu = require('./makeGetMenu');

const db = makeDataHandler(DATADIR, 'menu');
const listMenu = makeMenuList({ db, logger });
const getMenu = makeGetMenu({ db, logger });

module.exports = {
  listMenu,
  getMenu,
};
