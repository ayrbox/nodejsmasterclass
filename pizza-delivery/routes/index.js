const pingRoutes = require('./ping');
const userRoutes = require('./usersRoutes');
const tokenRoutes = require('./tokenRoutes');
const menuRoutes = require('./menuRoutes');
const cartRoutes = require('./cartRoutes');

module.exports = [
  ...pingRoutes,
  ...userRoutes,
  ...tokenRoutes,
  ...menuRoutes,
  ...cartRoutes,
];
