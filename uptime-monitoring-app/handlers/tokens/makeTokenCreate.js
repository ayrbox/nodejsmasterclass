const { performance, PerformanceObserver } = require('perf_hooks');
const { debuglog } = require('util');
const debug = debuglog('app:performance');

const perfObserver = new PerformanceObserver(items => {
  items.getEntries().forEach(item => {
    debug(`${item.name.padEnd(50, ' ')}\t${item.duration}ms`);
  });
});
perfObserver.observe({ entryTypes: ['measure'] });

const makeTokenCreate = function ({ db, helpers }) {
  return function (data, cb) {
    performance.mark('CREATETOKEN:START');

    performance.mark('CREATETOKEN:READPAYLOAD:START');
    const { phone, password } = data.payload;
    if (!phone || !password) {
      cb(400, new Error('Missing required fields'));
      return;
    }
    performance.mark('CREATETOKEN:READPAYLOAD:END');

    // Look up user
    performance.mark('CREATETOKEN:READUSER:START');
    db.read('users', phone, function (err, userData) {
      performance.mark('CREATETOKEN:READUSER:END');
      if (err && !userData) {
        cb(400, new Error('Could not find user.'));
        return;
      }

      performance.mark('CREATETOKEN:HASHPASSWORD:START');
      const hashedPassword = helpers.hash(password);
      const { hashedPassword: userPassword } = userData;
      performance.mark('CREATETOKEN:HASHPASSWORD:END');

      if (hashedPassword !== userPassword) {
        cb(400, new Error('Invaid credential'));
        return;
      }

      performance.mark('CREATETOKEN:TOKENID:START');
      // Create new token with expiry
      const tokenId = helpers.createRandomString(20);
      const expires = Date.now() + 1000 * 60 * 60;
      performance.mark('CREATETOKEN:TOKENID:END');

      performance.mark('CREATETOKEN:END');

      performance.measure(
        'Create Token: Complete',
        'CREATETOKEN:START',
        'CREATETOKEN:END'
      );
      performance.measure(
        'Read Payload',
        'CREATETOKEN:READPAYLOAD:START',
        'CREATETOKEN:READPAYLOAD:END'
      );
      performance.measure(
        'Read User',
        'CREATETOKEN:READUSER:START',
        'CREATETOKEN:READUSER:END'
      );
      performance.measure(
        'Hash Password',
        'CREATETOKEN:HASHPASSWORD:START',
        'CREATETOKEN:HASHPASSWORD:END'
      );
      performance.measure(
        'Generate Token',
        'CREATETOKEN:TOKENID:START',
        'CREATETOKEN:TOKENID:END'
      );

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
