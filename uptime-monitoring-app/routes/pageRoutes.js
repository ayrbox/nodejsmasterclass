const makePageRoutes = require('../handlers/pageHandlers');

const {
  indexPageHandler,
  getAccountHandler,
  createSessionHandler,
} = makePageRoutes();

module.exports = [
  {
    path: '',
    method: 'GET',
    handler: indexPageHandler,
  },
  {
    path: '/account/create',
    method: 'GET',
    handler: getAccountHandler,
  },
  {
    path: '/session/create',
    method: 'GET',
    handler: createSessionHandler,
  },
];
