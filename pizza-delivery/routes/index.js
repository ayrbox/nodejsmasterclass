const pingRoutes = require('./ping');
const userRoutes = require('./usersRoutes');
const tokenRoutes = require('./tokenRoutes');

module.exports = [
  ...pingRoutes,
  ...userRoutes,
  ...tokenRoutes,
];
