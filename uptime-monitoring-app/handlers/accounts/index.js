const path = require('path');
const makeGetAccount = require('./makeGetAccount');
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

  return {
    getAccountHandler,
  };
};

module.exports = makeAccountHandlers;
