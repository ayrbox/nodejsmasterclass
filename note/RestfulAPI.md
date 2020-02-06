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

```js
// index.js

// ....

const handlers = {
  // ...,
  ping: function(data, callback) {
    callback(200);
  },
}
```

```bash
$ curl localhost:3000/ping
```

## Storing Data
Using JSON file to store data.

- Create hidden folder named .data
.data will be hidden and will store data (json) file. 
```sh
$ mkdir .data
```

- Create `lib` folder to contain library
A data library or module that an app use interact with data file.
```js
$ mkdir lib
$ touch lib/data.js
```

```js
// data.js
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '../.data/');

const create = (dir, fileName, data, callback) => {
  const filePath = path.join(BASE_DIR, dir, `${fileName}.json`);

  // Open file for writing 
  fs.open(filePath, function(err, fileDescriptor) => {
    if (err || !fileDescriptor) {
      callback(new Error('Could not create new file, it may alrady exists.'));
      return;
    }

    const fileData = JSON.stringify(data);
    fs.writeFile(fileDescriptor, fileData, function(err) {
      if (err) {
        callback(new Error('Error writing to new file.'));
        return;
      }
      fs.close(fileDescriptor, function(err) {
        if(err) {
          callback(new Error('Error closing file'));
          return;
        }
        callback(false);
      });
    });
  });
};

const read = function(dir, fileName, callback) {
  const filePath = path.join(BASE_DIR, dir, `${fileName}.json`);
  fs.readFile(filePath, function(err, data) {
    if (err || !data) {
      callback(err, data);
      return;
    }

    const parsedData = helpers.parseJsonToObject(data);
    callback(false, parsedData);
  });
};

const update = function(dir, fileName, data, callback) {
  const filePath = path.join(BASE_DIR, dir, `${fileName}.json`);

  fs.open(filePath, 'r+', function(err, fileDescriptor) => {
    if (err || !fileDescriptor) {
      callback(new Error('Could not read file for update'));
      return;
    }
    const fileData = JSON.stringify(data);

    fs.truncate(fileDescriptor, function(err) {
      if (err) {
        callback(new Error('Error trancating file.'));
        return;
      }

      fs.writeFiel(fileDescriptor, fileData, function(err) {
        if(err) {
          callback(new Error('Error writing into file'));
          return;
        }

        fs.close(fileDescriptor, function(err) {
          if(err) {
            callback(new Error('Error closing file'));
            return;
          }
          callback(false);
        });
      });
    });
  });
}

const delete = function(dir, fileName, callback) {
  const filePath = path.join(BASE_DIR, dir, `${fileName}.json`);
  fs.unlink(filePath, callback);
};

module.exports = {
  create,
  read,
  update,
  delete,
};
```

## Service 2: `/users` 
Move handler to separate file.

```sh
$ touch lib/handlers.js
```

```js
// handlers.js

const _data = require('./data');
const { hash } = require('./helpers');

const ping = function(data, callback) { 
  callback(200);
};

const notFound = function(data, callback) {
  callback(404);
};
const _users = {
  get: function(data, callback) {
    // @TODO only let authenticated user access data 
    
    // Validate phone number
    const { phone } = data.queryString;

    if(!phone) {
      callback(400, new Error('Phone number is required'));
      return;
    } 

    _data.read('users', phone, function(err, data) {
      if (err || !data) {
        callback(404);
        return;
      }

      // omitting hashed password
      const { firstName, lastName, phone, tosAgreement } = data;
      callback(200, { firstName, lastName, phone, tosAgreement });
    });


  },
  post: function(data, callback) {
    // Create user { firstName, lastName, phone, password, tosAgreement }
    const {
      firstName,
      lastName,
      phone,
      password,
      tosAgreement,
    } = data.payload;


    if (
      !firstName ||
      !lastName ||
      !phone ||
      !passowrd ||
      !tosAgreement
    ) {
      callback(400, new Error('Missing required fields'));
      return;
    }

    // Make sure that the user does not already exists
    _data.read('users', phone, function(err, data) {
      if (!err) {
        callback(403, new Error('User with phone number already exists'));
        return;
      };
      // Hash the password
      const hashedPassword = hash(password);
      
      if(!hashedPassword) {
        callback(500, new Error('Unable to hash user password'));
        return;
      }

      _data.create('users', phone, {
        firstName,
        lastName,
        phone,
        password: hashedPassword,
        tosAgreement,
      }, function(err) {
        if (err) {
          callback(500, new Error('Could not create new user'));
          return;
        }

        callback(200);
      });

    });
    
  },
  put: function(data, callback) {
    // Update user with new datak 
    // TODO: Allow only authenticated user to update data

    const { firstName, lastName, phone, password } = data.payload;

    if (!phone) {
      callback(400, new Error('Phone number is missing'));
      return;
    }

    if (!(firstName || lastName || password)) {
      callback(400, new Error('Require fields to update'));
      return;
    }

    _data.read('users', phone, function(err, userData) {
      if(err || !data) {
        callback(404, new Error('User not found.'));
      }

      const dataToStore = {
        firstName: firstName || userData.firstName,
        lastName: lastName || userData.lastName,
        password: (password && helpers.hash(password)) || userData.password,
      };

      _data.update('users', phone, dataToStore, function(err) {
        if(err) {
          callback(500, new Error('Unable to update user'));
          return;
        }
        callback(200);
      });
    });
  },
  delete: function(data, callback) {
    // Delete user datak
    // TODO: check authenciation and authorisation

    // Validate phone number
    const { phone } = data.queryString;

    if(!phone) {
      callback(400, new Error('Phone number is required'));
      return;
    } 

    _data.read('users', phone, function(err, data) {
      if (err || !data) {
        callback(404);
        return;
      }

      _data.delete('users', phone, function(err) {
        if (!err) {
          callback(500, new Error('Could not delete user'));
          return;
        }

        callback(200);
      });
    });

  };
}

const users = function(data, callback) {
  const methodHandler = _users[data.method];
  if (!methodHander) {
    callback(405);
    return;
  }
  methodHandler(data, callback);
};

module.exports = {
  ping,
  notFound,
  users,
}
```

```js
// lib/helpers.js
const crypto = require('crypto');

const hash = function(stringToHash) {
  if !(typeof(stringToHash) === 'string' && stringToHash.length) {
    return false;
  }

  return crypto
    .createHmac('sha256', config.hashingSecret)
    .update(stringToHash)
    .digest('hex');
}

// parse a json string to an object
const parsedJsonToObject = function(stringToParse) {
  try {
    return JSON.parse(stringToParse);
  } catch () {
    return {};
  }
}

module.exports = {
  hash,
  parsedJsonToObject,
};
```

```js
// index.js
const handers = require('./lib/handlers');
// ...


const data = {
  // ...
  payload: helpers.parsedJsonToObject(buffer)
}

const router = {
  // ...,
  users: handlers.users,
}
```

## Service 3: `/tokens`
Create a token by authenticatin using phone and password. Then use the token to authenticate futher request.

```js
// index.js
// ...
const router = {
  // ...,
  tokens: handlers.tokens,
}
```

```js
// handlers.js

_tokens = {
  post: function(data, cb) {
    const { phone, password } = data.payload;
    if(!phone || !password) {
      cb(400, new Error('Missing required fields'));
      return;
    }

    // Look up user
    _data.read('users', phone, function(err, userData) {
      if (err && !userData) {
        cb(400, new Error('Could not find user.'));
        return;
      }

      const hashedPassword = helpers.hash(password);
      const { hashedPassword: userPassword } = userData;

      if (hashedPassword !== userPassword) {
        cb(400, new Error('Invaid credential'));
        return;
      }

      // Create new token with expiry
      const tokenId = helpers.createRandomString(20);
      const expires = Date.now() + 1000 * 60 * 60;

      const tokenObject = {
          phone,
          id: tokenId,
          expires,
      };

      _data.create('tokens', tokenId, tokenObject, function(err) {
        if(err) {
          cb(500, new Error('Unable to create token'));
          return;
        }
        cb(200, tokenObject);
      });
    });
  },
  get: function(data, cb) {
    const { id } = data.queryString;
    if(!id) {
      cb(400, new Error('Invalid id'));
      return;
    }

    _data.read('tokens', id, function(err, tokenData) {
      if (err || !tokenData) {
        cb(404);
        return;
      }
      cb(200, tokenData);

    });

  },
  put: function(data, cb) {
    const { id, extend } = data.payload;
    if (!id && !extend)  {
      cb(400, new Error('Invalid required fields'));
      return;
    }


    _data.read('tokens', id, function(err, tokenData) {
      if(err || !tokenData) {
        cb(400, new Error('Invalid token'))
        return;
      }
      
      const { expires } = tokenData;
      if (expires < Data.now()) {
        cb(400, new Error('Token already expired.'));
        return;
      }

      // Set  new expires
      tokenData.expires = Data.now() + 1000 * 60 * 60;
      _data.update('tokens', id, tokenData, function(err) {
        if(err) {
          cb(500, err);
          return;
        }

        cb(200);
      });
    });
  },
  delete: function(data, cb) {
    const { id } = data.queryString;
    if (!id) {
      cb(400, new Error('Inavlid fields'));
      return;
    }

    _data.read('tokens', id, function(err) {
      if(err || !data)  {
        cb(400, new Error('Invalid token'));
        return;
      }

      _data.delete('tokens', id, function(err) {
        if(err) {
          cb(500, new Error('Unable to delete'));
          return;
        }

        cb(200);
      });
    });
  },
}

const tokens = function(data, callback) {
  const methodHandler = _tokens[data.method];
  if (!methodHander) {
    callback(405);
    return;
  }
  methodHandler(data, callback);
};

```


```js
// helpers.js

// ....
const createRandomString = function(length) {
  const size = typeof(length) === 'number' && length > 0 && length;
  if (!size) {
    return false;
  }

  const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz1234567890';
  return new Array(size).fill(
    () => CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length))
  ).map(f => f()).join('');
}
```

## Service 4: `/checks`

## Connecting to API

## Background Workers

## Logging to Files

## Logging to Console

## Summary  
    