const pingRoutes = require("./ping");
const userRoutes = require("./usersRoutes");
const tokenRoutes = require("./tokenRoutes");
const menuRoutes = require("./menuRoutes");
const cartRoutes = require("./cartRoutes");
const checkoutRoutes = require("./checkoutRoutes");
const dashboardHandler = require("./dashboardRoutes");

module.exports = [
  ...pingRoutes,
  ...userRoutes,
  ...tokenRoutes,
  ...menuRoutes,
  ...cartRoutes,
  ...checkoutRoutes,
  ...dashboardHandler
];
