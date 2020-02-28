const makeCheckHandlers = require('../handlers/checks');
const db = require('../lib/data');

const {
  createHandler
} = makeCheckHandlers({ db });


module.exports = [{
  path: '/checks',
  method: 'POST',
  handler: createHandler,
}]