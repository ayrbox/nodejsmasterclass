const helpers = require('../../lib/helpers');
const makeCreateCheck = require('./create');

const makeCheckHandlers = function({
  db,
  logger,
}) {
  const createHandler = makeCreateCheck({
    db,
    logger,
    helpers,
  });

  return {
    createHandler,
  }
}

module.exports = makeCheckHandlers;
