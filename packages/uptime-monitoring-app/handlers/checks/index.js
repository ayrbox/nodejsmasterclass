const helpers = require('../../lib/helpers');
const makeCreateCheck = require('./create');
const makeGetCheck = require('./get');

const makeCheckHandlers = function({
  db,
  logger,
}) {

  const createHandler = makeCreateCheck({ db, logger, helpers });
  const getHandler = makeGetCheck({ db, logger, helpers });

  return {
    createHandler,
    getHandler,
  }
}

module.exports = makeCheckHandlers;
