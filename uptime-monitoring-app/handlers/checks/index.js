const helpers = require('../../lib/helpers');
const makeCreateCheck = require('./create');
const makeGetCheck = require('./get');
const makeUpdateCheckHandler = require('./update');
const makeDeleteCheckHandler = require('./delete');

const makeCheckHandlers = function({
  db,
  logger,
}) {

  const createHandler = makeCreateCheck({ db, logger, helpers });
  const getHandler = makeGetCheck({ db, logger, helpers });
  const updateHandler = makeUpdateCheckHandler({ db, logger, helpers });
  const deleteHandler = makeDeleteCheckHandler({ db, logger, helpers });

  return {
    createHandler,
    getHandler,
    updateHandler,
    deleteHandler,
  }
}

module.exports = makeCheckHandlers;
