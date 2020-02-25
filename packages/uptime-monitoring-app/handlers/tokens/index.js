
const makeTokenCreate = require('./makeTokenCreate');

const makeTokenHandlers = function({
  db,
  logger,
  helpers,
}) {

  const createHandler = makeTokenCreate({
    db, 
    logger,
    helpers,
  });


  return {
    createHandler,
  }

}

module.exports = makeTokenHandlers;


