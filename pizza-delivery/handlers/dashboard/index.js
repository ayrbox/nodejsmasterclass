const path = require("path");
const { DATADIR } = require("../../context");
const makeDataHandler = require("../../lib/makeDataHandlers");
const logger = require("../../lib/makeLogger")("handlers:dashboard");
const makeRender = require("../../lib/makeRender");
const makeDashboardHandler = require("./makeDashboardHandler");
const makeOrderHistoryHandler = require("./makeOrderHistoryHandler");
const makeHomePageHandler = require("./makeHomePageHandler");

// Pages UI
const viewsDir = path.join(process.cwd(), "views");
const render = makeRender(viewsDir);

const db = makeDataHandler(DATADIR, "order");

const dashboardHandler = makeDashboardHandler(render, {});
const orderHistoryHandler = makeOrderHistoryHandler({
  db,
  logger
});
const homePageHandler = makeHomePageHandler(render, {});

module.exports = {
  dashboardHandler,
  orderHistoryHandler,
  homePageHandler
};
