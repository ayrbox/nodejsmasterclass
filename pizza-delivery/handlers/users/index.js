const { DATADIR } = require('../../context');
const logger = require('../../lib/makeLogger')('handlers:users');

const makeDataHandler = require('../../lib/makeDataHandlers');
const makeCreateUser = require('./makeCreateUser');

const db = makeDataHandler(DATADIR, 'users');

const createUser = makeCreateUser({
  db,
  logger,
});

module.exports = {
  createUser,
};
