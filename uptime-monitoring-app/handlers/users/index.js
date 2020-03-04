const makeCreateUser = require('./create');
const makeDeleteUser = require('./delete');
const makeReadUser = require('./read');
const makeUpdateUser = require('./update');
const helpers = require('../../lib/helpers');

const makeUserHandlers = function(db, logger) {

  const createHandler = makeCreateUser(db, logger, helpers);  
  const deleteHandler = makeDeleteUser(db, logger);  
  const updateHandler = makeUpdateUser(db, logger, helpers);  
  const readHandler = makeReadUser(db, logger, helpers);  

  return {
    createHandler,
    deleteHandler,
    updateHandler,
    readHandler,
  };

};

module.exports = makeUserHandlers;
