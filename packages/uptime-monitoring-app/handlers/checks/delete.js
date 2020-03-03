const makeVerifyToken = require('../../lib/makeVerityToken');


const makeDeleteCheckHandler = function({
  db,
  logger,
  helpers,
}) {
  const verifyToken = makeVerifyToken(db);
  return function(data, callback) {

    const { id } = data.query;
    if(!id) {
      callback(400, new Error('Invalid request'));
      return;
    }

    db.read('checks', id, function(err, checkData) {
      if(err || !checkData) {
        callback(400, new Error('Invalid check'));
        return;
      }

      const { token } = data.headers;

      verifyToken({
        id: token,
        phone: checkData.phone,
      }, function(isValid) {
        if(!isValid) {
          callback(403, new Error('Unauthorised'));
          return;
        }

        db.delete('checks', id, function(err) {
          if(err) {
            callback(500, new Error('Unable to delete checks.'));
            return;
          }

          db.read('users', checkData.phone, function(err, userData) {
            if(err || !userData) {
              callback(500, new Error('Check user not found'));
              return;
            }
            const { checks } = userData;
            const updateChecks = checks.filter(c => c !== id);
            db.update('users', userData.phone, { ...userData, checks: updateChecks }, function(err) {
              if(err) {
                callback(500, 'Unable to update check user');
                return;
              }

              callback(200);

            });
          });

        });

      });
    });

    
  }
}

module.exports = makeDeleteCheckHandler;
