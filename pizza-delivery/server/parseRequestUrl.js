const url = require('url');

const parseRequestUrl = function(httpRequest) {
  const parsedUrl = url.parse(httpRequest.url, true);

  const requestPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

  const queryObject = parsedUrl.query; 
  const method = httpRequest.method.toUpperCase();

  const headers = httpRequest.headers;

  return {
    requestPath,
    query: queryObject,
    method,
    headers, 
  };
}

module.exports = parseRequestUrl;
