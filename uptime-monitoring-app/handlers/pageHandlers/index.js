const path = require('path');
const makeIndexPage = require('./makeIndexPage');
const makeGetAccount = require('./makeGetAccount');
const makeCreateSession = require('./makeCreateSession');
const makeDeletedSession = require('./makeDeletedSession');
const makeDashboardHandler = require('./makeDashboardHandler');
const makeRenderer = require('../../lib/renderer');

const viewsDir = path.join(process.cwd(), 'views');
const renderer = makeRenderer(viewsDir);

const appData = {
  companyName: 'NodeJS Master',
  appName: 'Uptime Monitor',
  appDescription: 'nodejs master class',
  baseUrl: '/',
  copyRightYear: new Date().getFullYear(),
  bodyClass: 'index',
};

const makeAccountHandlers = function () {
  const getAccountHandler = makeGetAccount(renderer, appData);
  const indexPageHandler = makeIndexPage(renderer, appData);
  const createSessionHandler = makeCreateSession(renderer, appData);
  const dashboardHandler = makeDashboardHandler(renderer, appData);
  const deletedSessionHandler = makeDeletedSession(renderer, appData);

  return {
    indexPageHandler,
    getAccountHandler,
    createSessionHandler,
    dashboardHandler,
    deletedSessionHandler,
  };
};

module.exports = makeAccountHandlers;
