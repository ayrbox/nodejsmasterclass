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

Setting header that the content type is `application/json` so the consumer 
understand the return payload is json.

```js
res.setheader('Content-Type', 'application/json');
```

## Adding Configuration 

`config.js`
```js
const environments = {
  dev: {
    port: 3000,
    name: 'Development',
  },
  staging: {
    port: 3000,
    name: 'Staging',
  },
  production: {
    port: 5000,
    name: 'Production',
  },
};

const env = process.env.NODE_ENV || 'dev';

module.exports = environments[env];
```

After configuration `config.js` is created. The configuration module can be use
in applicaiton `index.js`. 

`index.js`
```js
const config = require('./config'); 

/* ..... */

const { port, name: environmentName } = config;
server.listen(port, function() {
  console.log(`Listening on port ${port} in ${environmentName} mode`)
});

```

Usage to change environment
```sh
$ NODE_ENV=production node index.js
```

## Adding HTTPS Configuration

Add https to the sever.

- Create SSL Certificate
```sh
$ mkdir https && cd ./https

$ openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

Answer questions ask to generate key and you should have two file key.pem and cert.pem.

```
Generating a 2048 bit RSA private key
..........................................+++
.................+++
writing new private key to 'key.pem'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:gb
State or Province Name (full name) []:England
Locality Name (eg, city) []:London
Organization Name (eg, company) []:nodejs
Organizational Unit Name (eg, section) []:Engineering
Common Name (eg, fully qualified host name) []:localhost
Email Address []:admin@nodejs.com
```

- Modify config to separate out where to run http and https server.
```js
/* config.js */

const environments = {
  dev: {
    httpPort: 3000,
    httpsPort: 3001,
    name: 'Development',
  },
  staging: {
    httpPort: 3000,
    httpsPort: 3001,
    name: 'Staging',
  },
  production: {
    httpPort: 5000,
    httpsPort: 5001,
    name: 'Production',
  },
};
```

```js
/* index.js */

// ...
const {
  httpPort,
  httpsPort,
  name: environmentName,
} = require('./config'); 
const https = require('https'); 
const fs = require('fs');

// Unified logic for both http and https server
const unifiedServer = function(req, res) {
  /* ... all server logic ... */
}

// Http Server
const httpServer = http.createServer(unifiedServer);
httpServer.listen(httpPort, function() {
  console.log(`Listening on port ${httpPort} in ${environmentName} mode`)
});

// Https Server
const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem'), 
 ;

const httpsServer = https.createServer(httpsServerOptions, unifiedServer);

httpsServer.listen(httpsPort, function() {
  console.log(`Listening on port ${httpsPort} in ${environmentName} mode`);
});
```

## Service 1: `/ping`

## Service 2: `/users` 

## Service 3: `/tokens`

## Service 4: `/checks`

## Connecting to API

## Background Workers

## Logging to Files

## Logging to Console

## Summary  
    