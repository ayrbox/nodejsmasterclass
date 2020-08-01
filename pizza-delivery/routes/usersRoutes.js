const {
  createUser,
  deleteUser,
  updateUser,
  readUser,
} = require('../handlers/users');

module.exports = [
  {
    path: 'api/users',
    method: 'POST',
    handler: createUser,
  },
  {
    path: 'api/users',
    method: 'DELETE',
    handler: deleteUser,
    secure: true,
  },
  {
    path: 'api/users',
    method: 'PUT',
    handler: updateUser,
    secure: true,
  },
  {
    path: 'api/users',
    method: 'GET',
    handler: readUser,
    secure: true,
  },
];
