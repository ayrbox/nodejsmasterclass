const pingRoutes = require('./pingRoutes');
const userRoutes = require('./userRoutes');
const tokenRoutes = require('./tokenRoutes');
const checkRoutes = require('./checkRoutes');

module.exports = [
  ...pingRoutes,
  ...userRoutes,
  ...tokenRoutes,
  ...checkRoutes,
];
