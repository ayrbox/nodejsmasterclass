const { 
  createUser,
  deleteUser,
  updateUser,
  readUser,
} = require('../handlers/users');

module.exports = [{
  path: '/users',
  method: 'POST',
  handler: createUser,
}, {
  path: '/users',
  method: 'DELETE',
  handler: deleteUser,
}, {
  path: '/users',
  method: 'PUT',
  handler: updateUser,
}, {
  path: '/users',
  method: 'GET',
  handler:readUser 
}];