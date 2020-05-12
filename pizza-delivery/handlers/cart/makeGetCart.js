const { hash } = require('../../lib/cryptoHash');

const makeGetCart = function ({ db }) {
  return function ({ user }, responseCallback) {
    const cartId = `cart-${hash(user.email)}`;
    db.read(cartId, (err, cartData) => {
      if (err || !cartData) {
        responseCallback(404, {
          msg: 'Unable to find cart.',
        });
        return;
      }
      responseCallback(200, cartData);
    });
  };
};

module.exports = makeGetCart;
