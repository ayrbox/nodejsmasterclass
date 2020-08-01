const { checkout } = require('../handlers/checkout');

module.exports = [
  {
    path: 'api/checkout',
    method: 'POST',
    handler: checkout,
    secure: true,
  },
];
