const makePageRoutes = require('../handlers/pageHandlers');

const {
  indexPageHandler,
  getAccountHandler,
  createSessionHandler,
  deletedSessionHandler,
  dashboardHandler,
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
  {
    path: '/session/deleted',
    method: 'GET',
    handler: deletedSessionHandler,
  },
  {
    path: '/checks/all',
    method: 'GET',
    handler: dashboardHandler,
  },
];
