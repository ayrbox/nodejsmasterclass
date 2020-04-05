const logger = require('../lib/makeLogger')('middleware:log');

const logMiddleware = function(req, res, next) {
  const { path, method } = req;
  logger.info(`[${(new Date()).toUTCString()}]: ${method} ${path}`);
  next();
}

module.exports = logMiddleware;