const { dashboardHandler } = require("../handlers/dashboard");

module.exports = [
  {
    path: "dashboard",
    method: "GET",
    handler: dashboardHandler,
    secure: true
  }
];
