const makeTokenRead = require('./makeTokenRead');
const makeTokenCreate = require('./makeTokenCreate');
const makeTokenUpdate = require('./makeTokenUpdate');
const makeTokenDeleteHandler = require('./makeTokenDelete');

const makeTokenHandlers = function ({ db, logger, helpers }) {
  const createHandler = makeTokenCreate({ db, logger, helpers });
  const readHandler = makeTokenRead({ db });
  const updateHandler = makeTokenUpdate({ db });
  const deleteHandler = makeTokenDeleteHandler({ db });

  return {
    createHandler,
    readHandler,
    updateHandler,
    deleteHandler,
  };
};

module.exports = makeTokenHandlers;
