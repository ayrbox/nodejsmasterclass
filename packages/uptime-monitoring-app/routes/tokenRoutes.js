const db = require('../lib/data');
const helpers = require('../lib/helpers');

const makeTokenHandlers = require('../handlers/tokens');

const {
  createHandler,
  readHandler,
} = makeTokenHandlers({db, helpers });


module.exports = [{
  path: '/tokens',
  method: 'POST',
  handler: createHandler,
}, {
  path: '/tokens',
  method: 'GET',
  handler: readHandler,
}];


