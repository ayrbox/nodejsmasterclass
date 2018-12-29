const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

// The server should response to all request with a string
const server = http.createServer((req, res) => {

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
    console.log(
      `Request path: ${trimmedPath}\n`, 
      `Method :${method}\n`,
      `and query string ${JSON.stringify(queryStringObject, null, 2)}\n`,
      `Headers: ${JSON.stringify(headers, null, 2)}\n`, 
      `Payload: ${buffer}\n\n`
    );

    // choose handler by the pathname
    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // construct data object to send to hander
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer
    };

    //Router the request to the handler to specifed router
    chosenHandler(data, (status = 200, payload = {}) => {
      
      res.writeHead(status);
      res.end(JSON.stringify(payload));

      // Log the request 
      console.log('Returning', status, payload);
    });


    // send the response
    res.end('Hello World\n');

  });
});


// Start the server and have it listen on port 3000
server.listen(3000, () => {
  console.log('The server is listenning on port 3000 now');
});


const handlers = {};
handlers.sample = (data, cb) => {

  // callback a http status code, and payload object
  cb(406, {
    name: 'Sample Handler',
  });
};

handlers.notFound = (data, cb) => {
  cb(404);
};


// Define a request router
const router = {
  sample: handlers.sample
}

