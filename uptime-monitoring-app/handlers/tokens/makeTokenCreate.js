const makeTokenCreate = function ({ db, helpers }) {
  return function (data, cb) {
    const { phone, password } = data.payload;
    if (!phone || !password) {
      cb(400, new Error('Missing required fields'));
      return;
    }

    // Look up user
    db.read('users', phone, function (err, userData) {
      if (err && !userData) {
        cb(400, new Error('Could not find user.'));
        return;
      }

      const hashedPassword = helpers.hash(password);
      const { hashedPassword: userPassword } = userData;

      console.log(hashedPassword, userPassword);

      if (hashedPassword !== userPassword) {
        cb(400, new Error('Invaid credential'));
        return;
      }

      // Create new token with expiry
      const tokenId = helpers.createRandomString(20);
      const expires = Date.now() + 1000 * 60 * 60;

      const tokenObject = {
        phone,
        id: tokenId,
        expires,
      };

      db.create('tokens', tokenId, tokenObject, function (err) {
        if (err) {
          cb(500, new Error('Unable to create token'));
          return;
        }
        cb(200, tokenObject);
      });
    });
  };
};

module.exports = makeTokenCreate;
