const pingHandler = require("../../handlers/ping");

module.exports = [
  {
    path: "/ping",
    method: "GET",
    handler: pingHandler
  }
];
