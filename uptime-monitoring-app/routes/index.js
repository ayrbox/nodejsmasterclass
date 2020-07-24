const pingRoutes = require("./pingRoutes");

/* API Routes */
const userRoutes = require("./userRoutes");
const tokenRoutes = require("./tokenRoutes");
const checkRoutes = require("./checkRoutes");

/* HTML Page Routes */
const pageRoutes = require("./pageRoutes");

module.exports = [
  ...pingRoutes,
  ...userRoutes,
  ...tokenRoutes,
  ...checkRoutes,
  ...pageRoutes
];
