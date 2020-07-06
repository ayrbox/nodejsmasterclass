const url = require("url");
const { StringDecoder } = require("string_decoder");
const { inspect } = require("util");

const parseRequestUrl = function (httpRequest) {
  const parsedUrl = url.parse(httpRequest.url, true);

  const requestPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, "");
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
const defaultHandler = (_, callback) => {
  callback(404, "NOT FOUND", "text/plain");
};

const makeServer = function (routers, helpers) {
  return function (req, res) {
    const { requestPath, query, method, headers } = parseRequestUrl(req); // TODO: move to helper file

    // get payload, if any
    const decoder = new StringDecoder("utf-8");

    let buffer = "";
    req.on("data", (data) => {
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
        handler: defaultHandler,
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
        (status = 200, payload = {}, contentType = "application/json") => {
          // Return the response
          res.setHeader("Content-Type", contentType);
          res.writeHead(status);
          let payload_ = "";
          if (typeof payload === "object") {
            payload_ = JSON.stringify(payload);
          } else if (typeof payload === "string") {
            payload_ = payload;
          }
          res.end(payload_);

          // Log the resposne
          console.log("Return", status, payload);
        }
      );
    });
  };
};

module.exports = makeServer;
