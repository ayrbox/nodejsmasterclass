const {
  dashboardHandler,
  orderHistoryHandler
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
  }
];
