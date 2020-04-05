
const { DATADIR } = require('../context');
const makeDataHandler = require('../lib/makeDataHandlers');
const logger = require('../lib/makeLogger')('middleware:log');

const db = makeDataHandler(DATADIR, 'tokens');
const dbUsers = makeDataHandler(DATADIR, 'users');

const authToken = function(req, res, next) {
  const { headers, secure } = req;
  const { token } = headers;

  if(secure && !token) {
    logger.warning('401 Unautenticated');
    res.writeHead(401);
    res.end(JSON.stringify({ message: 'Unautenticated.' }));
    return;
  }

  db.read(token, (err, tokenData) => {
    if(err || !tokenData) {
      logger.warning(err);
      res.writeHead(403);
      res.end(JSON.stringify({ message: 'Invalid token.'}));
      return;
    }

    const { email, expires } = tokenData;

    // check token expiry time
    if(expires < Date.now()) {
      logger.warning(`Expired token ${token}`);
      res.writeHead(403);
      res.end(JSON.stringify({ message: 'Token already expired.'}));
      return;
    }

    // set user object to req
    dbUsers.read(email, (err, user) => {
      if(err || !user) {
        logger.warning(err);
        res.writeHead(403);
        res.end(JSON.stringify({ message: 'User with auth token not found' }));
        return;
      }

      req.user = user;

      next();
    });
  });
  
}

module.exports = authToken;