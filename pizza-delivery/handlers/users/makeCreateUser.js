const makeCreateUser = function({
  db,
  logger,
}) {
  return function({ payload }, responseCallback) {
    const {
      name,
      email,
      phone,
      address,
    } = payload; // TODO: validate users data

    db.create(email, {
      name,
      email,
      phone,
      address,
    }, function(err) {
      if(err) {
        logger.warning(err.message);
        responseCallback(500, { message: err.message })
        return;
      }
      responseCallback(201, { message: 'User created'});
    });
  }
}

module.exports = makeCreateUser;
