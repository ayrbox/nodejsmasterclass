const url = require('url');
const { StringDecoder } = require('string_decoder');
const { inspect } = require('util');

const makeServeStatic = require('./lib/static');

const parseRequestUrl = function (httpRequest) {
  const parsedUrl = url.parse(httpRequest.url, true);

  const requestPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
  const queryStringObject = parsedUrl.query;
  const method = httpRequest.method.toUpperCase();
  const headers = httpRequest.headers;

  return {
    requestPath,
    query: queryStringObject,
    method,
    headers,
  };
};

const makeDefaultHandler = function (serveStatic) {
  return function (req, callback) {
    serveStatic(req.path, function (err, content, contentType = 'text/plain') {
      if (err) {
        callback(404, 'NOT FOUND', 'text/plain');
        return;
      }
      callback(200, content, contentType);
    });
  };
};

const makeServer = function (routers, helpers, staticFolder) {
  const serveStatic = makeServeStatic(staticFolder);

  return function (req, res) {
    const { requestPath, query, method, headers } = parseRequestUrl(req); // TODO: move to helper file

    // get payload, if any
    const decoder = new StringDecoder('utf-8');

    let buffer = '';
    req.on('data', data => {
      buffer += decoder.write(data);
    });

    req.on('end', () => {
      buffer += decoder.end();

      // choose handler by the pathname
      const { handler } = routers.find(
        ({ path: routePath, method: routeMethod }) => {
          return (
            routePath.replace(/^\/+|\/+$/g, '') === requestPath &&
            method === routeMethod
          );
        }
      ) || {
        handler: makeDefaultHandler(serveStatic),
      };

      // construct data object to send to hander
      const data = {
        path: requestPath,
        query,
        method,
        headers,
        payload: helpers.parseJsonToObject(buffer),
      };

      // Router the request to the handler to specifed router
      handler(
        data,
        (status = 200, payload = '', contentType = 'application/json') => {
          // Return the response
          res.setHeader('Content-Type', contentType);
          res.writeHead(status);
          if (typeof payload === 'string') {
            res.end(payload);
          } else if (typeof payload === 'object') {
            res.end(JSON.stringify(payload));
          } else {
            res.end();
          }

          // Log the resposne
          console.log('Return', status, payload);
        }
      );
    });
  };
};

module.exports = makeServer;
