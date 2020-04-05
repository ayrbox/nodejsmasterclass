const logger = require('../lib/makeLogger')('middleware:log');

const authToken = function(req, res, next) {
  const { headers } = req;
  const { token } = headers;

  if(!token) {
    logger.warning('401 Unautenticated');
    res.writeHead(401);
    res.end(JSON.stringify({ message: 'Unautenticated.' }));
    return;
  }
  
  next();
}

module.exports = authToken;