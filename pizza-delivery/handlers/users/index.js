const { DATADIR } = require('../../context');
const logger = require('../../lib/makeLogger')('handlers:users');

const makeDataHandler = require('../../lib/makeDataHandlers');
const makeCreateUser = require('./makeCreateUser');
const makeReadUser = require('./makeReadUser');

const db = makeDataHandler(DATADIR, 'users');

const createUser = makeCreateUser({ db, logger });
const readUser = makeReadUser({ db, logger });

module.exports = {
  createUser,
  readUser,
};
