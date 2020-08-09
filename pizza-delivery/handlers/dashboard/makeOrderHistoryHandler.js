const makeListMenu = function({ db, logger }) {
  return function(req, responseCallback) {
    const { email } = req.user;

    db.list(function(err, data) {
      if (err) {
        logger.warning(err.message);
        responseCallback(500, { message: "Unable to read menu." });
        return;
      }
      const filteredOrder = data.filter(
        order => order.delivery.email === email
      );
      responseCallback(200, filteredOrder);
    });
  };
};

module.exports = makeListMenu;
