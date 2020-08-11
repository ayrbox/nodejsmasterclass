const makeDeleteToken = function({ db, logger }) {
  return function({ query }, responseCallback) {
    const { token } = query;

    if (!token) {
      responseCallback(400, { message: "Invalid token" });
      return;
    }

    db.delete(token, function(err) {
      if (err) {
        logger.warning(err);
        responseCallback(404, { message: "Unable to delete token." });
        return;
      }

      responseCallback(200, { message: "Token deleted." });
    });
  };
};

module.exports = makeDeleteToken;
