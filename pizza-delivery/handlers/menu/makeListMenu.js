const makeListMenu = function ({ db, logger }) {
  return function (_, responseCallback) {
    db.list(function (err, data) {
      if (err) {
        logger.warning(err.message);
        responseCallback(500, { message: 'Unable to read menu.' });
        return;
      }
      responseCallback(200, data);
    });
  };
};

module.exports = makeListMenu;
