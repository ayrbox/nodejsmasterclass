function parseCookies(httpRequest) {
  const list = {};
  const rc = httpRequest.headers.cookie;
  rc &&
    rc.split(";").forEach(function(cookie) {
      var parts = cookie.split("=");
      list[parts.shift().trim()] = decodeURI(parts.join("="));
    });

  return list;
}

const cookieParserMiddleware = function(req, res, next) {
  req.cookies = parseCookies(req);

  next();
};

module.exports = cookieParserMiddleware;
