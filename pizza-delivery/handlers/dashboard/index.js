const path = require("path");
const { DATADIR } = require("../../context");
const makeDataHandler = require("../../lib/makeDataHandlers");
const logger = require("../../lib/makeLogger")("handlers:dashboard");
const makeRender = require("../../lib/makeRender");
const makeDashboardHandler = require("./makeDashboardHandler");
const makeOrderHistoryHandler = require("./makeOrderHistoryHandler");

// Pages UI
const viewsDir = path.join(process.cwd(), "views");
const render = makeRender(viewsDir);

const db = makeDataHandler(DATADIR, "order");

const dashboardHandler = makeDashboardHandler(render, {});
const orderHistoryHandler = makeOrderHistoryHandler({
  db,
  logger
});

module.exports = {
  dashboardHandler,
  orderHistoryHandler
};
