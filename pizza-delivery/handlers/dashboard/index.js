const path = require("path");

const makeRender = require("../../lib/makeRender");
const makeDashboardHandler = require("./makeDashboardHandler");

// Pages UI
const viewsDir = path.join(process.cwd(), "views");
const render = makeRender(viewsDir);

const dashboardHandler = makeDashboardHandler(render, {});

module.exports = {
  dashboardHandler
};
