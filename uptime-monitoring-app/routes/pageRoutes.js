const makePageRoutes = require('../handlers/pageHandlers');

const {
  indexPageHandler,
  getAccountHandler,
  createSessionHandler,
  deletedSessionHandler,
  dashboardHandler,
  accountEditHandler,
  accountDeletedHandler,
  createCheckHandler,
  editCheckHandler,
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
  {
    path: '/account/edit',
    method: 'GET',
    handler: accountEditHandler,
  },
  {
    path: '/account/deleted',
    method: 'GET',
    handler: accountDeletedHandler,
  },
  {
    path: '/checks/create',
    method: 'GET',
    handler: createCheckHandler,
  },
  {
    path: '/checks/edit',
    method: 'GET',
    handler: editCheckHandler,
  },
];
