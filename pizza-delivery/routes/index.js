const pingRoutes = require('./ping');
const userRoutes = require('./usersRoutes');
const tokenRoutes = require('./tokenRoutes');
const menuRoutes = require('./menuRoutes');

module.exports = [
  ...pingRoutes,
  ...userRoutes,
  ...tokenRoutes,
  ...menuRoutes,
];
