const db = require('../lib/data');
const helpers = require('../lib/helpers');

const makeTokenHandlers = require('../handlers/tokens');

const {
  createHandler
} = makeTokenHandlers({db, helpers });


module.exports = [{
  path: '/tokens',
  method: 'POST',
  handler: createHandler,
}];


