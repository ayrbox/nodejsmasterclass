const { hash } = require('../../lib/cryptoHash');

const makeCreateToken = function({
  db,
  dbUsers,
  logger,
}) {
  return function({ payload }, responseCallback) {
    const {
      email,
      password, 
    } = payload;


    if(!email || !password) {
      responseCallback(400, new Error('Email and Password required.'));
      return;
    }
    
    // Get users information by email
    dbUsers.read(email, (err, userData) => {
      if (err || !userData) {
        responseCallback(404, { message: 'User not found.' });
        return;
      }

      const hashedPassword = hash(password);

      if(hashedPassword !== userData.password) {
        responseCallback(401, { message: 'Invalid username or password.' });
        return;
      }

      const expires = Date.now() + (1000 * 60 * 60); // Add one hour to current time.
      const token = hash(`token-${email}-${expires}`);

      db.create(token, {
        id: token,
        email,
        expires,
      }, function(err) {
        if(err) {
          logger.warning(err);
          responseCallback(500, { message: err.message })
          return;
        }
        responseCallback(201, { token: token });
      });
    });
  }
}

module.exports = makeCreateToken;
