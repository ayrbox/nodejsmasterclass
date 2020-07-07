const makeAccountHandlers = require('../handlers/accounts');

const { getAccountHandler } = makeAccountHandlers();

module.exports = [
  {
    path: '',
    method: 'GET',
    handler: getAccountHandler,
  },
];
