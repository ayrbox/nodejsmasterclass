const pingRoutes = require('./pingRoutes');
const userRoutes = require('./userRoutes');
const tokenRoutes = require('./tokenRoutes');

module.exports = [
  ...pingRoutes,
  ...userRoutes,
  ...tokenRoutes,
];
