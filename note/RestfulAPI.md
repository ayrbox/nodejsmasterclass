# Building RESTful API
Restful API without any npm packages.

## Start a Server

Start a http server that listen to a request.

```js
// node built-in module.
const http = require('http');

const server = http.createServer(function(req, res) { 
  res.end('Hello World');
});

// Listen to a port
server.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
```

## Parsing Request Paths
Parse HTTP request to know which method to invoke.

```js
const http = require('http');
const url = require('url');

const server = http.createServer(function(req, res) { 
  // Get Url and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get url path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Send response
  res.end('Requsted Received');

  // Log response path
  console.log('Request received on this path: ' + trimmedPath);
});

server.listen(3000, function() {
  console.log('Server is listening to port 3000');
});

```

## Parting HTTP Methods

Get HTTP method from HTTP request.

```js
/* ...... */
const trimmedPath = path.replace(/^\/+|\/+$/g, '');

// Get HTTP method
const method = req.method.toLowerCase();

// Send reponse
res.end('Request Received');

console.log('Request received on this path: ' + trimmedPath + ' with method ' + method);

/* ...... */
```

## Parsing Query String

Read query string parameters from HTTP request. `URL` module parse the query string.

```js
// Get query string to an object
const queryString = parsedUrl.query;

/* ..... */
console.log(`
  Request received on this path: ${trimmedPath} with method ${method}.
  ${JSON.stringify(queryString, null, 2)}
`);
```

```sh
$ curl localhost:3000/foo/bar?fizz=buzz
```

## Parsing Headers

Parse request header for application to us it.
```js
/* .... */

// Get the headers object from request
const headers = req.headers;

/* ..... */

console.log('Request Headers', headers);
```

```sh
$ curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://localhost:3000/foo/bar
```

## Parsing Payloads

Parsing payload from request object with help of StringDecoder.

```js
/* .... */

const { StringDecoder}= require('string_decoder');

// Get payload if exists
const decoder = new StringDecoder('utf-8'); 

var buffer = '';
req.on('data', function(data) {
  buffer += decoder.write(data);
});

req.on('end', function() {
  buffer += decoder.end();

  res.end('Request received');
  
  console.log('Requeste receved with payload', buffer);
});

```

## Routing Requests

Parse request and route to request handlers.


```js

/* ..... */


req.on('end', function() { 
  buffer += decode.end();

  const routerHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath]: handlers.notFound;

  const data = {
    trimmedPath,
    queryString, 
    method,
    headers,
    payload: buffer,
  };

  // Route request to handler
  rounterHander(data, function(statusCode, payload) {
    // Default statuscode or specified
    const responseStatusCode = statusCode || 200;

    // Default payload or specified 
    const responsePayload = payload || {};

    // Return response
    res.writeHead(responseStatusCode);
    res.end(JSON.stringify(responsePayload));

    console.log('Returning this resposne:', responseStatuscode, responsePayload);
  });

});


// Define a request router handler
const handlers = {};

// Sample Handler
handlers.sample = function (data, callback) {
  // Callback a http status code, and payload object
  callback(406, { name: 'Sample Handler' });
};

// Not found handlers
handlers.notFound = function(data, callback) {
  callback(404);
};

const router = {
  'sample': handlers.sample,
  'notFound': handlers.notFound
}
```

## Returning JSON

## Adding Configration 

## Adding HTTPS Configuration

## Service 1: `/ping`

## Service 2: `/users` 

## Service 3: `/tokens`

## Service 4: `/checks`

## Connecting to API

## Background Workers

## Logging to Files

## Logging to Console

## Summary  
    