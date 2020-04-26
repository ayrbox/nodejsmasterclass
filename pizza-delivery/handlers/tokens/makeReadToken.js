const makeReadToken = function ({ db, logger }) {
  return function ({ query }, responseCallback) {
    const { token } = query;

    if (!token) {
      responseCallback(400, { message: "Invalid token" });
      return;
    }

    db.read(token, function (err, tokenData) {
      if (err || !tokenData) {
        logger.warning(err);
        responseCallback(404, { message: "Invalid token. Not found. " });
        return;
      }

      responseCallback(200, { ...tokenData });
    });
  };
};

module.exports = makeReadToken;
