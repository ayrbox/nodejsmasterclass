const pingRoutes = require('./pingRoutes');
const userRoutes = require('./userRoutes');

module.exports = [
  ...pingRoutes,
  ...userRoutes,
];
