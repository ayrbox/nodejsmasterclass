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

## Check Authentication

```js
// handlers.js

const _tokens = {
  // ....,
  verifyToken: function(id, phone, cb) {
    _data.read('tokens', id, function(err, tokenData) {
      if(err || !tokenData) {
        cb(false);
      }

      if(tokenData.phone === phone & tokenData.expires > Data.now()) {
        cb(true);
      } else {
        cb(false); 
      }
    });
  },
};

```

Verify users token in handlers.

```js
const { token } = data.headers;
if(_verifytoken(token, phone, function(isValid) {
  if(!isValid) {
    callback(403, new Error('Error authentication'));
    return;
  }
});
```

## Service 4: `/checks`
Checks is service for users to check if any given endpoint (url) is up or down. Allow user to keep up to 5 checks.


```js
// index.js
const router = {
  checks: handlers.checks,
}
```

```js
// handlers.js
const checks = function(data, callback) {
  const methodHandler = _tokens[data.method];
  if (!methodHander) {
    callback(405);
    return;
  }
  methodHandler(data, callback);
};

const _checks = {
  post: function (data, cb) {
    // paylod: { protocol, url, method, successCodes, timeouts }

    // Validate
    const { protocol, url, method, successCodes, timeouts } = data.payload;
    if(!['http', 'https'].includes(protocol)) {
      cb(400, new Error('Invalid check protocol'));
      return;
    }

    if(!['post','get', 'put', 'delete'].includes(method)) {
      cb(400, new Error('Invalid check method'));
      return;
    }

    const { token } = data.headers || false;
    _data.read('tokens', token, function(err, tokenData) {
      if(err || !tokenData) {
        cb(403);
        return;
      }

      const { phone } = tokenData;
      _data.read('users', phone, function(err, userData) {
        if(err || !userData) {
          cb(403);
          return;
        }

        const { checks } = userData;
        if (checks.lenght >= config.maxChecks) {
          cb(400, new Error('User already has maximum number of checks'));
          return;
        }

        const checkId = helpers.createRandomString(20);
        const checkObject = {
          id: checkId,
          phone,
          protol,
          url,
          method,
          successCodes,
          timeout,
        };
        _data.creat('checks', checkId, checkObject, function(err) { 
          if(err) {
            cb(500, 'Unable to store check');
            return;
          }

          userData.checks = checks || []; 
          userData.checks.push(checkId);

          _data.update('users', phone, userData, function(err) {
            if(err) {
              cb(500, 'Unable to update user with checks');
              return;
            }
            cb(201, checkObject);
          })

        });
      });
    });
  },
  get: function(data, cb) {
    const { id, token } = data.queryString;
    if(!id) {
      cb(400, new Error('Invalid fields'));
      return;
    }

    // Lookup check
    _data.read('checks', id, function(err, checkData) {
      if(err && !checkData) {
        cb(404);
        return;
      }

      const { phone } = checkData;

      _tokens.verifyToken(token, phone, function(isValid) {
        if(!isValid) {
          cb(403, new Error('Not authorised'));
          return;
        }
        cb(200, checkData);
      });
    });
  },
  put: function(data, cb) {

    // Validate
    const { id, protocol, url, method, successCodes, timeouts } = data.payload;
    if(!id) {
      cb(400, new Error('Invaid request payloadd'));
      return;
    }

    if(!['http', 'https'].includes(protocol)) {
      cb(400, new Error('Invalid check protocol'));
      return;
    }

    if(!['post','get', 'put', 'delete'].includes(method)) {
      cb(400, new Error('Invalid check method'));
      return;
    }

    _data.read('checks', id, function(err, checkData) {
      if(err || !checkData) {
        cb(400, new Error('Check ID did not exists.'));
        return;
      }

      const { token } = data.headers;
      _tokens.verifyToken(token, checkData.phone, function(isValid) {
        if(!isValid) {
          cb(403);
          return;
        }

        const checkObject = {
          id,
          protocol: protocol || checkData.protocol,
          url: url || checkData.url,
          method: method || checkData.method,
          successCodes: successCodes || checkData.successCode,
          timeouts: timeouts || checkData.timeouts,
        };

        _data.update('checks', id, checkObject, function(err) {
          if(err) {
            cb(500, new Error('Could not update check'));
            return;
          }
          cb(200);
        });
      });
    });
  },
  delete: function(data, cb) {
    const { id } = data.queryString;
    if(!id) {
      cb(400, new Error('Invalid request'));
      return;
    }
    _data.read('checks', id, function(err, checkData) {
      if(err || !checkData) {
        cb(400, new Error('Invalid check'));
        return;
      }

      const { token } = data.headers;
      
      _tokens.verifyToken(token, checkData.phone, function(isValid) {
        if(!isValid) {
          cb(403);
          return;
        }

        // delete check data;
        _data.delete('checks', id, function(err) {
          if (err) {
            cb(500, 'Unable to delete check');
            return;
          }

          _data.read('users', checkData.phone, function(err, userData) {
            if(err || !userData) {
              cb(500, new Error('Check user not found'));
              return;
            }

            const { checks } = userData;
            const updatedCheks = checks.filter(c => c !== id); // filter out chek
            _data.update('users', phone, function(err) {
              if(err) {
                cb(500, 'Unable to update check user');
                return;
              }
              cb(200);
            });
          });
        });
      });
    });
  },
}
```

## Connecting to API

Create api client to connect to twillio api

```js
// helpers.js

const https = require('https');
const querystring = require('querystring');

// ...

const sendSMS = function(phone, msg, cb) {
  // validate 
  if (!phone || !msg) {
    cb(new Error('Invalid paramaters'));
    return;
  }

  // configure request payload
  const payload = JSON.stringify({
    From: config.twilio.fromPhone,
    To: phone,
    Body: msg,
  });

  const requestDetails = {
    protocol: 'https:',
    hostname: 'api.twilio.com',
    method: 'POST',
    path: `/2010-04-01/Accounts/${config.twilio.accountSID}/Message.json`,
    auth: `${config.tiwilo.accountSID}:${config.tiwilo.authToken}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(payload),
    }
  };

  const req = https.request(requestDetails, function(res) {
    const status = res.statusCode;

    if (status === 200 || status === 201) {
      cb(false);
    } else {
      cb(new Error(`Status code return was ${status}`));
    }
  });

  req.on('error', function(err) {
    cb(err);
  });

  req.write(payload);
  req.end();
}


module.exports = {
  // ...
  sendSMS,
}
```

```js
// config.js

// ..
twilio: {
  accountSID: '',
  authToken: '',
  fromPhone: '',
}
```

## Background Workers
Create background worker to run checks requests by users.
- Move all api routers and server to `server.js`

```js
// index.js

const server = require('./server');
const workers = require('./workers');

const app = {
  init: function() {
    server.init();
    workers.init();
  },
};

module.exports = app;
```

```js
// server.js

// ... all code from index.js 

const server = {
  httpServer,
  init: function() {
    // start http server
    this.httpServer.listen(config.httpsPort, function() { }),
    this.httpsServer.listen(config.httpPort, function() { }),
  }
}

module.exports = server;
```

```js
// helpers.js

lib.list = function(dir, cb) {
  fs.readdir(lib.baseDir, function(err, data) {
    if(err) {
      cb(err, data);
      return;
    }

    const fileList = (data || []).map(fileName => fileName.replace('.json', ''));
    cb(false, fileList);
  });
}
```


```js
// worker.js

const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const url = require('url');

const _data = require('./data');
const helpers = require('./helpers');


const alertUserToStatusChange = function({ phone, method, protocol, url, state }) {
  const msg = `Alert: your check for ${method.toUpperCase()} ${protocol}://${url} is currently ${state}`;
  helpers.sendSMS(phone, msg, function(err) {
    if(!err) {
      console.log('User is alerted');
    } else {
      console.log('Error sending SMS alert');
    }
  });
}


const processCheckoutcome = function(checkData, checkOutcome) {
  const state = !checkoutOutcome.error && checkOutcome.responseCode && checkData.successCodes.indexOf(checkoutOutcome.responseCode) > -1 ? 
    'up' : 'down';
    
  const alertWarranted = checkData.lastChecked && checkData.state !== state;
  
  // update the check

  const updatedCheck = {
    ...checkData,
    status,
    lastChecked: Date.now(),
  };

  _data.update('checks', checkData.id, updatedCheck, function(err) {
    if(!err) {
      if(alertWarranted) {
        alertUserToStatusChange(updatedCheck);
      } else {
        console.log('Check outcome has not changed');
      }
    } else {
      console.log('Error upading checks');
    }
  })
}


const performCheck = function({
  protocol,
  url,
  method,
  path,
  timeout,
}) {
  const checkOutcome = {
    error: false,
    responseCode: false,
  };

  const outcomeSent = false;
  
  const { hostname, path }= url.parse(`${protocol}://${url}`, true);

  const requestDetails = {
    protocol: `${protocol}:`,
    hostname,
    method,
    path,
    timeout: timeout * 1000,
  };

  httpModule = protocol === 'http' ? http : https;

  const req = httpModule.request(requestDetails, function(res) {
    checkOutcome.responseCode = res.statusCode;
    if(!outcomeSend) {
      processCheckoutcome(checkData, checkOutcome);
      outcomeSent = true;
    }
  });

  req.on('error', function(e) {
    checkoutcome.error = {
      error: true,
      value: e,
    };

    if(!outcomeSend) {
      processCheckoutcome(checkData, checkoutOutcome);
      outcomeSent = true;
    }
  });

  req.on('timeout', function(e) {
    checkoutcome.error = {
      error: true,
      value: 'Timeout',
    };

    if(!outcomeSend) {
      processCheckoutcome(checkData, checkoutOutcome);
      outcomeSent = true;
    }
  });

  req.end();
};


const validateCheckData = function (checkData) {
  const d = (typeof(checkData) === 'object' && checkData !== null) ? checkData : {};
  const { id, phone, protocol, url, method, successCode, timeout, state, lastChecked }  = d;
  // if (typeof(id) === 'string')

  if(id && phone && protocol && url && method && successCode && timeout) {
    performCheck({
      id,
      phone,
      protocol,
      url,
      method,
      successCode,
      timeout,
      state: state || 'down',
      lastChecked: lastChecked || false,
    })
  } else {
    console.log('Error in check data');
  }
}

const gatherAllChecks = function() {
  _data.list('checks', function(err, checks) {
    if(err || !checks || !checks.length) {
      console.log('Error: no checks');
      return; 
    }

    checks.forEach(function(check) {
      _data.read('checks', check, function(err, originalCheckData) {
        if(err) {
          console.log('Error reading checks' + check);
          return;
        }
        validateCheckData(originalCheckData);
      });
    });
  });
}

const loop = function() {
  setInterval(function() {
    gatherAllChecks();
  }, 1000 * 60);
}

const workers = {
  init: function() {
    // execute all checks immediately
    gatherAllChecks();

    // call loop 
    loop();
  }
}

module.exports = workers;
```

## Logging to Files

```js
// worker.js
// ...
const _logs = require('./logs');

// ...

const rotateLogs = () => {

}

const logRotationLoop = () => {

}

const log = function(
  originalCheckdata,
  checkOutcome,
  state,
  alertWarned,
  timeOfCheck,
) {

  // Form log object
  const logData = {
    check: originalCheckdata,
    outcome: checkoutOutCome,
    state,
    alert: alertWarned,
    time: timeOfCheck,
  };

  // Conver data to string
  const logString = JSON.stringify(logData);

  // Determine name of log file
  const logFileName = originalCheckData.id;

  // Append the log string to the file
  _logs.append(logFileName, logString, function(err) {
    if(err) {
      console.log('Login to file failed'); 
      return;
    }
    console.log('Login succeeded');
  });
}


// Rotate (compress) the logs files
const rotateLogs = function() {
  _logs.list(false, function(err, logs) {
    if(err || !logs || logs.length <= 0) {
      console.log('Error: could not find any logs to rotate');
      return;
    }
    logs.forEach(function(logName) {
      const logId = logName.replace('.log', '');
      const newFileNameId = `${logId}-${Date.now()}`;
      _logs.compress(logId, newFileNameId, function(err) {
        if(err) {
          console.log('Error: compressing log files', err);
          return;
        }
        // Truncating the logs
        _logs.truncate(logId, function(err) {
          if(err) {
            console.log('Error: truncating log file');
            return;
          }
          console.log('Success truncating logFile');
        });
      })
    });
  });
}

// Timer to execute the log-rotation process once per day
const logRationloop = function() {
  setInterval(function() {
    rotateLogs();
  }, 1000 * 60 * 60 * 24);
}



const worker = {
  init: function() {
    // ...
  },
  log,
}
```


```js
// logs.js

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const BASEDIR = path.join(__dirname, '../.logs');


// Append a string to a file. Create the file if it does not exists.
const append = function(file, str, callback) {
  fs.open(`${BASEDIR}${file}.log`, 'a', function(err, fileDescriptor) {
    if(err && !fileDescriptor) {
      callback(new Error('Could not open file for appending.'));
      return;
    }

    // Append to the file and close it
    fs.appendFile(fileDescriptor, `${str}\n`, function(err) {
      if(err) {
        callback(new Error('Error appending to file.'));
        return;
      }

      fs.close(fileDescriptor, function(err) {
        if(err) {
          callback(new Error('Error closing file.'));
          return;
        }
        callback(false);
      });

    });
  });
}


const list = function(includeCompressedLogs, callback) {
  fs.readdir(BASEIDR, function(err, data) {
    if(err || data || data.length > 0) {
      callback(err, data);
      return;
    }
    const trimmedFileNames = [];
    data.forEach(function(fileName) {
      // Add the .log files
      if(fileName.indexOf('.log') > -1) {
        trimmedFileNames.push(fileName.replace('.log', ''));
      }
      
      // Add on the .gz files
      if(fileName.indexOf('.gz.b64') >- 1 && includeCompressedLogs) {
        trimmedFileNames.push(fileName.replace('.gz.b64', ''));
      }
    });
    callback(false, trimmedFileNames);
  });
} 


// Compress
const compress = function(logId, newFileId, callback) {
  const sourceFile = `${logId}.log`;
  const destFile = `${newFileId}.gz.b64`;

  // Read source file
  fs.readFile(`${BASEDIR}${sourceFile}`, 'utf8', function(err, inputString) {
    if(err || !inputString) {
      callback(err);
      return;
    }

    // Compress the data using zlib
    zlib.gzip(inputString, function(err, buffer) {
      if(err || !buffer) {
        callback(err);
        return;
      }

      // Send data to dest file
      fs.open(`${BASEDIR}${destFile}`, 'wx', function(err, fileDescriptor) {
        if(err || !fileDescriptor) {
          callback(err);
          return;
        }
      });

      fs.writeFile(fileDescriptor, buffer.toString('base64'), function(err) {
        if(err) {
          callback(err);
          return;
        }

        fs.close(fileDescriptor, function(err) {
          if(err) {
            callback(err);
            return;
          }
          callback(false);
        });
      });
    });
  });
}


const decompress = function(fileId, callback) {
  const fileName = `${fileId}.gz.b64`;
  fs.readFile(BASEDIR + fileName, 'utf8', function(err, str) {
    if(err) {
      callback(err);
      return;
    }

    // Decompress data
    const inputBuffer = Buffer.from(str, 'base64');
    zlib.unzip(inputBuffer, function(err, outputBuffer) {
      if(err || !outputBuffer) {
        callback(err);
        return;
      }
      const str = outputBuffer.toString();
      callback(false, str);
    });  
  });
}

const truncate = function(logId, callback) {
  fs.truncate(`${BASEDIR}${logId}.log`, 0, function(err) {
    if(err) {
      callback(err);
      return;
    }
    callback(false);
  });
}

// Container module for logs
const lib = {
  append,
  list,
  truncate,
  compress,
  decompress,
};

module.exports.lib;
```

## Logging to Console

## Summary  
    