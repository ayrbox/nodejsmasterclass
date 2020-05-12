/**
 * Verify token from phone and id
 * @param {data} db
 */
const makeVerifyToken = function (db) {
  return function ({ id, phone }, callback) {
    db.read('tokens', id, function (err, tokenData) {
      if (err || !tokenData) {
        callback(false);
        return;
      }

      if (tokenData.phone === phone && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    });
  };
};

module.exports = makeVerifyToken;
