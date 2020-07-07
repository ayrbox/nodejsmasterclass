const path = require('path');
const makeGetAccount = require('./makeGetAccount');
const makeRenderer = require('../../lib/renderer');

const viewsDir = path.join(process.cwd(), 'views');
const renderer = makeRenderer(viewsDir);

const makeAccountHandlers = function () {
  const getAccountHandler = makeGetAccount(renderer);

  return {
    getAccountHandler,
  };
};

module.exports = makeAccountHandlers;
