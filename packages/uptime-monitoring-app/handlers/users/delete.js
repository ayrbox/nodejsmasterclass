const makeVerifyToken = require('../../lib/makeVerityToken');

const makeDeleteUser = function(db, logger, helpers) {

  const verifyToken = makeVerifyToken(db);

  return function(data, callback) {

    // Validate phone number
    const { phone } = data.query;
    const { token } = data.headers;

    if(!phone) {
      callback(400, new Error('Phone number is required'));
      return;
    } 

    verifyToken({
      id: token,
      phone,
    }, function(isValid) {
      if(!isValid) {
        callback(403, new Error('Not authorised to remove user.'))
        return;
      }

      db.read('users', phone, function(err, data) {
        if (err || !data) {
          callback(404);
          return;
        }

        db.delete('users', phone, function(err) {
          if (err) {
            callback(500, new Error('Could not delete user'));
            return;
          }

          callback(200);
        });
      });
    });
  }
};

module.exports = makeDeleteUser;
