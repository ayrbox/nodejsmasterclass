const { StringDecoder } = require('string_decoder');

const parseRequestUrl = require('./parseRequestUrl');
const logger = require('../lib/makeLogger')('server');
const composeMiddleware = require('./composeMiddleware');

const defaultHandler = {
  handler: function (_, callback) {
    callback(404, { message: 'Not found.' });
  },
};

const makeServer = function ({ routes = [], middlewares = [] }) {
  routes
    .map(({ method, path }) => `${method.padEnd(10, ' ')}: ${path}`)
    .forEach(info => logger.info(info));

  return function (req, res) {
    const { requestPath, query, method, headers } = parseRequestUrl(req);

    const decoder = new StringDecoder('utf-8');

    let buffer = '';
    req.on('data', data => {
      buffer += decoder.write(data);
    });

    req.on('end', () => {
      buffer += decoder.end();

      const { handler, secure } =
        routes.find(({ path: routePath, method: routeMethod }) => {
          return (
            routePath.replace(/^\/+|\/+$/g, '') === requestPath &&
            routeMethod === method
          );
        }) || defaultHandler;

      const requestData = {
        path: requestPath,
        query,
        method,
        headers,
        payload: JSON.parse(buffer || '{}'), // TODO: user generic parse function
        secure,
      };

      const composedHandler = composeMiddleware(middlewares);

      const fnNext = function () {
        handler(requestData, function (status = 200, payload = {}) {
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(status);
          res.end(JSON.stringify(payload));

          logger.info(`Status ${status}: ${JSON.stringify(payload)}`);
        });
      };

      composedHandler(requestData, res, fnNext);
    });
  };
};

module.exports = makeServer;
