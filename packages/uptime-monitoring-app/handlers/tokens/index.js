const makeTokenRead = require('./makeTokenRead');
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

  const readHandler = makeTokenRead({
    db,
  }) 

  return {
    createHandler,
    readHandler,
  }

}

module.exports = makeTokenHandlers;


