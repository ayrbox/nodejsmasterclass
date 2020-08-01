const makeTokenRead = function ({ db }) {
  return function (data, cb) {
    const { id } = data.query;
    if (!id) {
      cb(400, new Error('Invalid id'));
      return;
    }

    db.read('tokens', id, function (err, tokenData) {
      console.log('>>>>>>>>>>>>..', tokenData);
      if (err || !tokenData) {
        cb(404);
        return;
      }
      cb(200, tokenData);
    });
  };
};

module.exports = makeTokenRead;
