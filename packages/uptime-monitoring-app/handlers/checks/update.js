const makeVerifyToken = require('../../lib/makeVerityToken');

const makeUpdateCheckHandler = ({
  db,
  logger,
  helpers,
}) => {

  const verifyToken = makeVerifyToken(db);

  return function(data, callback) {
    const { id, protocol, url, method, successCodes, timeouts } = data.payload;

    if(!id) {
      callback(400, new Error('Invalid request payload'));
      return;
    }

    if(!['http', 'https'].includes(protocol)) {
      callback(400, new Error('Invalid check protocol'));
      return;
    }

    if(!['POST', 'GET', 'PUT', 'DELETE'].includes(method)) {
      callback(400, new Error('Invalid check method.'));
      return;
    }

    db.read('checks', id, function(err, checkData) {
      if(err || !checkData) {
        callback(400, new Error('Check ID did not exists.'));
        return;
      }

      const { token } = data.headers;
      verifyToken({
        id: token,
        phone: checkData.phone,
      }, function(isValid) {
        if(!isValid) {
          callback(403, new Error('Not authorised'));
          return;
        }

        const updatedCheck = {
          id,
          phone: checkData.phone,
          protocol: protocol || checkData.protocol,
          url: url || checkData.url,
          method: method || checkData.method,
          successCodes: successCodes || checkData.successCodes,
          timeouts: timeouts || checkData.timeouts,
        };

        db.update('checks', id, updatedCheck, function(err) {
          if(err) {
            callback(400, new Error('Could not update check.'));
            return;
          }
          callback(200);
        });

      });
    });
  }
}

module.exports = makeUpdateCheckHandler;
