const makeUpdateToken = function ({ db, logger }) {
  return function ({ payload }, responseCallback) {
    const { token, extend } = payload;

    if (!token || !extend) {
      responseCallback(400, { message: 'Invalid request.' });
      return;
    }

    db.read(token, function (err, tokenData) {
      if (err || !tokenData) {
        logger.warning(err);
        responseCallback(404, { message: 'Invalid token. Not found. ' });
        return;
      }

      const { expires } = tokenData;
      if (expires < Date.now()) {
        responseCallback(400, { message: 'Token already expired.' });
        return;
      }

      const updatedToken = {
        ...tokenData,
        expires: Date.now() + 1000 * 60 * 60,
      };

      db.update(token, updatedToken, function (err) {
        if (err) {
          logger.warning(err);
          responseCallback(500, {
            message: 'Unexpectd error extending token.',
          });
          return;
        }

        responseCallback(200, updatedToken);
      });
    });
  };
};

module.exports = makeUpdateToken;
