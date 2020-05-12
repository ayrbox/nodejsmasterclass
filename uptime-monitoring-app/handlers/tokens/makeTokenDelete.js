const makeTokenDeleteHandler = function ({ db }) {
  return function (data, cb) {
    const { id } = data.query;
    if (!id) {
      cb(400, new Error('Inavlid fields'));
      return;
    }

    db.read('tokens', id, function (err) {
      if (err || !data) {
        cb(400, new Error('Invalid token'));
        return;
      }

      db.delete('tokens', id, function (err) {
        if (err) {
          cb(500, new Error('Unable to delete'));
          return;
        }

        cb(200);
      });
    });
  };
};

module.exports = makeTokenDeleteHandler;
