const { checkout } = require("../handlers/checkout");

module.exports = [
  {
    path: "/checkout",
    method: "POST",
    handler: checkout,
    secure: true
  }
];
