const makeCreateUser = require('./create');
const makeDeleteUser = require('./delete');
const makeReadUser = require('./read');
const makeUpdateUser = require('./update');

const makeUserHandlers = function(db, logger) {

  const createHandler = makeCreateUser(db, logger);  
  const deleteHandler = makeDeleteUser(db, logger);  
  const updateHandler = makeUpdateUser(db, logger);  
  const readHandler = makeReadUser(db, logger);  

  return {
    createHandler,
    deleteHandler,
    updateHandler,
    readHandler,
  };

};

module.exports = makeUserHandlers;
