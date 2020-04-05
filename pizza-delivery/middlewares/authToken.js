const logger = require('../lib/makeLogger')('middleware:log');

const authToken = function(req, res, next) {
  const { headers, secure } = req;
  const { token } = headers;

  if(secure && !token) {
    logger.warning('401 Unautenticated');
    res.writeHead(401);
    res.end(JSON.stringify({ message: 'Unautenticated.' }));
    return;
  }
  
  next();
}

module.exports = authToken;