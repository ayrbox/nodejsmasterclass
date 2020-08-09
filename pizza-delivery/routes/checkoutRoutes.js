const { checkout, checkoutPageHandler } = require("../handlers/checkout");

module.exports = [
  {
    path: "api/checkout",
    method: "POST",
    handler: checkout,
    secure: true
  },
  {
    path: "checkout",
    method: "GET",
    handler: checkoutPageHandler,
    secure: true
  }
];
