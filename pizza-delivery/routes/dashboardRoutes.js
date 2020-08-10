const {
  dashboardHandler,
  orderHistoryHandler,
  homePageHandler
} = require("../handlers/dashboard");

module.exports = [
  {
    path: "dashboard",
    method: "GET",
    handler: dashboardHandler,
    secure: true
  },
  {
    path: "api/order/history",
    method: "GET",
    handler: orderHistoryHandler,
    secure: true
  },
  {
    path: "",
    method: "GET",
    handler: homePageHandler,
    secure: false
  }
];
