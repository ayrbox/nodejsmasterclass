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

## Parsing Query String

## Parsing Headers

## Parsing Payloads

## Routing Requests

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
    