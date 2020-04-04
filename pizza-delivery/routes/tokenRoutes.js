const { 
  createToken,
  readToken,
  updateToken,
  deleteToken,
} = require('../handlers/tokens');


module.exports = [{
  path: '/tokens',
  method: 'POST',
  handler: createToken,
}, {
  path: '/tokens',
  method: 'GET',
  handler: readToken,
}, {
  path: '/tokens',
  method: 'PUT',
  handler: updateToken, 
}, {
  path: '/tokens',
  method: 'DELETE',
  handler: deleteToken,
}];


