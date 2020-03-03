const makeCheckHandlers = require('../handlers/checks');
const db = require('../lib/data');

const {
  createHandler,
  getHandler,
  updateHandler,
  deleteHandler,
} = makeCheckHandlers({ db });

module.exports = [{
  path: '/checks',
  method: 'POST',
  handler: createHandler,
}, {
  path: '/checks',
  method: 'GET',
  handler: getHandler,
}, {
  path: '/checks',
  method: 'PUT',
  handler: updateHandler,
}, {
  path: '/checks',
  method: 'DELETE',
  handler: deleteHandler,
}];
