const makePingHandlers = require('../handlers/ping');

// Making handlers
const { ping } = makePingHandlers();


module.exports = [{
  path: '/ping',
  method: 'GET',
  handler: ping,
}];
