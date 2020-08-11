const { listMenu, getMenu, menuPageHandler } = require("../handlers/menu");

module.exports = [
  {
    path: "api/menus",
    method: "GET",
    handler: listMenu,
    secure: true
  },
  {
    path: "api/menu",
    method: "GET",
    handler: getMenu,
    secure: true
  },
  {
    path: "menu",
    method: "GET",
    handler: menuPageHandler,
    secure: true
  }
];
