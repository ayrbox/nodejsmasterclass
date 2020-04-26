const { hash } = require("../../lib/cryptoHash");

const makeDeleteCart = function ({ db }) {
  return function ({ user }, responseCallback) {
    const cartId = `cart-${hash(user.email)}`;
    db.delete(cartId, err => {
      if (err) {
        responseCallback(404, {
          msg: "Unable to delete cart."
        });
        return;
      }
      responseCallback(202, {
        msg: "Cart is deleted"
      });
    });
  };
};

module.exports = makeDeleteCart;
