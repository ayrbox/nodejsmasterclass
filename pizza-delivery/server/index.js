const parseRequestUrl = require('./parseRequestUrl');

const makeServer = function({
  routes,
}) {

  return function(req, res) {
    const {
      requestPath,
      query,
      method,
      headers,
    } = parseRequestUrl(req);


    console.log('Path', requestPath);
    console.log('query', JSON.stringify(query));
    console.log('method', method);
    console.log('Headers', headers);

  }

}

module.exports = makeServer;