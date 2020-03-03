const makeCheckHandlers = require('../handlers/checks');
const db = require('../lib/data');

const {
  createHandler,
  getHandler,
} = makeCheckHandlers({ db });


module.exports = [{
  path: '/checks',
  method: 'POST',
  handler: createHandler,
}, {
  path: '/checks',
  method: 'GET',
  handler: getHandler,
}];
