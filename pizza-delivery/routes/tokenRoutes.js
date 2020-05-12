const {
  createToken,
  readToken,
  updateToken,
  deleteToken,
} = require('../handlers/tokens');

module.exports = [
  {
    path: '/tokens',
    method: 'POST',
    handler: createToken,
  },
  {
    path: '/tokens',
    method: 'GET',
    handler: readToken,
    secure: true,
  },
  {
    path: '/tokens',
    method: 'PUT',
    handler: updateToken,
    secure: true,
  },
  {
    path: '/tokens',
    method: 'DELETE',
    handler: deleteToken,
    secure: true,
  },
];
