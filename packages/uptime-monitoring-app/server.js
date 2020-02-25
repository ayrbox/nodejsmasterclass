const url = require('url');
const { StringDecoder } = require('string_decoder');

const parseRequestUrl = function(httpRequest) {
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
}


const makeServer = function(routers, helpers) {
  return function(req, res) {
    const {
      path,
      query,
      method,
      headers,
    } = parseRequestUrl(req); // TODO: move to helper file
    
    // get payload, if any
    const decoder = new StringDecoder('utf-8');

    let buffer = '';
    req.on('data', data => {
      buffer += decoder.write(data);
    });

    req.on('end', () => {
      buffer += decoder.end();
      // log the request path
      console.log('Request Path: ', path);
      console.log('Method: ', method);
      console.log('Query: ', query);
      console.log('Headers: ', headers);
      console.log('Payload: ', buffer);

      // choose handler by the pathname
      const chosenHandler = typeof(routers[path]) !== 'undefined' ? routers[path] : (_, callback) => {
        callback(404);
      }; // handlers.notFound;

      // construct data object to send to hander
      const data = {
        path,
        query,
        method,
        headers,
        payload: helpers.parseJsonToObject(buffer)
      };

      // Router the request to the handler to specifed router
      chosenHandler(data, (status = 200, payload = {}) => {
        // Return the response
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(status);
        res.end(JSON.stringify(payload));

        // Log the resposne 
        console.log('Returning', status, payload);
      });
    });
  };
}

module.exports = makeServer;
