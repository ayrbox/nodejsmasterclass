const makeVerifyToken = require('../../lib/makeVerityToken');

const makeGetCheck = function ({ db, logger, helpers }) {
  const verifyToken = makeVerifyToken(db);
  return function (data, callback) {
    const { id } = data.query;
    const { token } = data.headers;
    if (!id) {
      callback(400, new Error('Invalid fields'));
      return;
    }

    // Lookup check
    db.read('checks', id, function (err, checkData) {
      if (err && !checkData) {
        callback(404);
        return;
      }

      const { phone } = checkData;

      verifyToken(
        {
          id: token,
          phone,
        },
        function (isValid) {
          if (!isValid) {
            callback(403, new Error('Not authorised'));
            return;
          }
          callback(200, checkData);
        }
      );
    });
  };
};

module.exports = makeGetCheck;
