const http = require('http');
const https = require('https');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const fs = require('fs');

const config = require('./config');
const handlers = require('./handlers');
const helpers = require('./lib/helpers');


// The server should response to all request with a string
http.createServer((req, res) => {
  unifiedServer(req, res);
}).listen(config.httpPort, () => {
  console.log(`The server is listenning on port ${config.httpPort} in ${config.envName} mode`);
});


https.createServer({
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem'), 
}, (req, res) => {
  unifiedServer(req, res);
}).listen(config.httpsPort, () => {
  console.log(`The server is listenning on port ${config.httpsPort} in ${config.envName} mode`);
});




const unifiedServer = (req, res) => {
  // get url and prase it
  const parsedUrl = url.parse(req.url, true);
  
  // get path from that url
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
 

  // Get the query string
  const queryStringObject = parsedUrl.query;


  // get HTTP method
  const method = req.method.toLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  // get payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', data => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {

    buffer += decoder.end();
    
    // log the request path
    console.log('Request Path: ', trimmedPath);
    console.log('Method: ', method);
    console.log('Query: ', queryStringObject);
    console.log('Headers: ', headers);
    console.log('Payload: ', buffer);

    // choose handler by the pathname
    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // construct data object to send to hander
    const data = {
      trimmedPath,
      queryStringObject,
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


// Define a request router
const router = {
  ping: handlers.ping,
  users: handlers.users,
}

