const url = require("url");
const { StringDecoder } = require("string_decoder");
const { inspect, debuglog } = require("util");
const debug = debuglog("app:server");

const makeServeStatic = require("./lib/static");

const parseRequestUrl = function(httpRequest) {
  const parsedUrl = url.parse(httpRequest.url, true);

  const requestPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, "");
  const queryStringObject = parsedUrl.query;
  const method = httpRequest.method.toUpperCase();
  const headers = httpRequest.headers;

  return {
    requestPath,
    query: queryStringObject,
    method,
    headers
  };
};

const makeDefaultHandler = function(serveStatic) {
  return function(req, callback) {
    serveStatic(req.path, function(err, content, contentType = "text/plain") {
      if (err) {
        callback(404, "NOT FOUND", "text/plain");
        return;
      }
      callback(200, content, contentType);
    });
  };
};

const makeServer = function(routers, helpers, staticFolder) {
  const serveStatic = makeServeStatic(staticFolder);

  return function(req, res) {
    const { requestPath, query, method, headers } = parseRequestUrl(req); // TODO: move to helper file

    // get payload, if any
    const decoder = new StringDecoder("utf-8");

    let buffer = "";
    req.on("data", data => {
      buffer += decoder.write(data);
    });

    req.on("end", () => {
      buffer += decoder.end();

      // choose handler by the pathname
      const { handler } = routers.find(
        ({ path: routePath, method: routeMethod }) => {
          return (
            routePath.replace(/^\/+|\/+$/g, "") === requestPath &&
            method === routeMethod
          );
        }
      ) || {
        handler: makeDefaultHandler(serveStatic)
      };

      // construct data object to send to hander
      const data = {
        path: requestPath,
        query,
        method,
        headers,
        payload: helpers.parseJsonToObject(buffer)
      };

      // Router the request to the handler to specifed router
      try {
        handler(data, makeCallbackHandler(res));
      } catch (err) {
        debug(err);
        makeCallbackHandler(res)(500, {
          msg: "Unexpected server error"
        });
      }
    });
  };
};

const makeCallbackHandler = function(httpResponse) {
  return function(
    status = 200,
    payload = "",
    contentType = "application/json"
  ) {
    // Return the response
    httpResponse.setHeader("Content-Type", contentType);
    httpResponse.writeHead(status);
    if (typeof payload === "string") {
      httpResponse.end(payload);
    } else if (
      typeof payload === "object" &&
      contentType === "application/json"
    ) {
      httpResponse.end(JSON.stringify(payload));
    } else {
      httpResponse.end(payload);
    }
  };
};

module.exports = makeServer;
