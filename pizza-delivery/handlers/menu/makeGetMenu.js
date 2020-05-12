const makeGetMenu = function ({ db, logger }) {
  return function ({ query }, responseCallback) {
    const { id } = query;
    db.read(id, function (err, data) {
      if (err) {
        logger.warning(err.message);
        responseCallback(404, { message: 'Unable to read menu.' });
        return;
      }
      responseCallback(200, data);
    });
  };
};

module.exports = makeGetMenu;
