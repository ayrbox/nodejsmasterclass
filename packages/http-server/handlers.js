/**
 * Request handler
 */

const db = require('./lib/data');
const helpers = require('./lib/helpers');

const validateStringRequired = value => (value || '').trim().length > 0 ? (value || '').trim() : false;

  

const handlers = {};
handlers.ping = (data, cb) => {
  cb(200);
};

handlers.notFound = (data, cb) => {
  cb(404);
};


handlers.users = (data, callback) => {

  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) < 0) {
    callback(405);
  }

  handlers._users[data.method](data, callback);
};


handlers._users = {
  post: (data, callback) => {
    // validate required fields
    const { payload } = data;

    const rawData = ['firstName', 'lastName', 'phone', 'password', 'tosAgreement']
      .map(key => ({key, value: validateStringRequired(payload[key])}))

    const invalidData = rawData.find(d => !d.value);
    if (invalidData) {
      callback(400, {
        error: 'Missing required fields'
      });
    }

    const {
      firstName,
      lastName,
      phone,
      password,
      tosAgreement,
    } = rawData.reduce((o, item) => {
      o[item.key] = item.value;
      return o; 
    }, {});
      
    //data make sure user does not exists
    db.read('users', phone, (err, data) => {
      if (!err) {
        return callback(400, { error: 'User with phone number already exists' });
      }

      // hash password
      const hashedPassword = helpers.hash(password);
      if (!hashedPassword) {
        return callback(500, {
          message: 'Could not hash the users password'
        });
      }

      db.create('users', phone, {
        firstName,
        lastName,
        phone,
        hashedPassword,
        tosAgreement
      }, (err) => {

        if (err) {
          console.log(err);
          return callback(500, {
            message: 'Could not create user', 
            err,
          });
        }

        callback(201);
      });
      
    })
  },
  // @TODO Only access for owner
  get: (data, callback) => {
    const { phone } = data.queryStringObject;
    if(!validateStringRequired(phone)) {
      return callback(400, {
        error: 'Invalid phone number'
      });
    }
    
    db.read('users', phone, (err, data) => {
      if (err) {
        return callback(404);
      } else if(!err && data) {
        const {
          firstName,
          lastName,
          tosAgreement,
        } = data;

        callback(200, {
          firstName,
          lastName,
          phone,
          tosAgreement,
        });

      }
    });
  },

  put: (data, callback) => {
    const { phone } = data.queryStringObject;
    if(!validateStringRequired(phone)) {
      return callback(400, {
        error: 'Invalid phone number'
      });
    }

  },

  delete: (data, callback) => {
  },

}

module.exports = handlers;
