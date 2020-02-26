const db = require('../lib/data');
const helpers = require('../lib/helpers');

const makeTokenHandlers = require('../handlers/tokens');

const {
  createHandler,
  readHandler,
  updateHandler,
  deleteHandler,
} = makeTokenHandlers({db, helpers });


module.exports = [{
  path: '/tokens',
  method: 'POST',
  handler: createHandler,
}, {
  path: '/tokens',
  method: 'GET',
  handler: readHandler,
}, {
  path: '/tokens',
  method: 'PUT',
  handler: updateHandler,
}, {
  path: '/tokens',
  method: 'DELETE',
  handler: deleteHandler,
}];
