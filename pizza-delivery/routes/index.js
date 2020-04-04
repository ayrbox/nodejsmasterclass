const pingRoutes = require('./ping');
const userRoutes = require('./usersRoutes');

module.exports = [
  ...pingRoutes,
  ...userRoutes,
];
