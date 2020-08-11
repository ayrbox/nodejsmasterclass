const path = require("path");

const { DATADIR } = require("../../context");
const logger = require("../../lib/makeLogger")("handlers:users");
const makeRender = require("../../lib/makeRender");

const makeDataHandler = require("../../lib/makeDataHandlers");
const makeMenuList = require("./makeListMenu");
const makeGetMenu = require("./makeGetMenu");
const makeMenuPageHandler = require("./makeMenuPageHandler");

const db = makeDataHandler(DATADIR, "menu");
const listMenu = makeMenuList({ db, logger });
const getMenu = makeGetMenu({ db, logger });

// Pages UI
const viewsDir = path.join(process.cwd(), "views");
const render = makeRender(viewsDir);

const menuPageHandler = makeMenuPageHandler(render, {});

module.exports = {
  listMenu,
  getMenu,
  menuPageHandler
};
