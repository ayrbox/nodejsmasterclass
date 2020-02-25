const makeUserHandler = require('../handlers/users');

// Making handlers
const { 
  createHandler,
  deleteHandler,
  updateHandler,
  readHandler,
} = makeUserHandler({}, null);

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
