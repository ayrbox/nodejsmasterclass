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


// handlers._users = {
//   post: (data, callback) => ,
//   // @TODO Only access for owner
//   get: ,

//   put: ,

//   delete: ,

// }

module.exports = handlers;
