const makePageRoutes = require("../handlers/pageHandlers");

const { indexPageHandler, getAccountHandler } = makePageRoutes();

module.exports = [
  {
    path: "",
    method: "GET",
    handler: indexPageHandler
  },
  {
    path: "/account/create",
    method: "GET",
    handler: getAccountHandler
  }
];
