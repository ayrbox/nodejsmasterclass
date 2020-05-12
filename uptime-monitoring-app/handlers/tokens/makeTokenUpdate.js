const makeTokenUpdate = function ({ db }) {
  return function (data, cb) {
    const { id, extend } = data.payload;
    if (!id && !extend) {
      cb(400, new Error('Invalid required fields'));
      return;
    }

    db.read('tokens', id, function (err, tokenData) {
      if (err || !tokenData) {
        cb(400, new Error('Invalid token'));
        return;
      }

      const { expires } = tokenData;
      if (expires < Date.now()) {
        cb(400, new Error('Token already expired.'));
        return;
      }

      // Set  new expires
      tokenData.expires = Date.now() + 1000 * 60 * 60;
      db.update('tokens', id, tokenData, function (err) {
        if (err) {
          cb(500, err);
          return;
        }

        cb(200);
      });
    });
  };
};

module.exports = makeTokenUpdate;
