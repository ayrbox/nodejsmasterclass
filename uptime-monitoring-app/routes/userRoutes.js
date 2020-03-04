const makeUserHandler = require('../handlers/users');

const db = require('../lib/data');

// Making handlers
const { 
  createHandler,
  deleteHandler,
  updateHandler,
  readHandler,
} = makeUserHandler(db, null);

module.exports = [{
  path: '/users',
  method: 'POST',
  handler: createHandler,
}, {
  path: '/users',
  method: 'DELETE',
  handler: deleteHandler,
}, {
  path: '/users',
  method: 'PUT',
  handler: updateHandler,
}, {
  path: '/users',
  method: 'GET',
  handler: readHandler
}];
