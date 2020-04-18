const { hash } = require('../../lib/cryptoHash');

const makeCheckout = function({
  dbCart, 
  dbOrder,
  randomString,
  logger,
}) {
  return function({
    payload,
    user,
  }, responseCallback) {
    const {
      cardType,
      cardNo,
      cvvCode,
      expiryDate,
    } = payload;

    const cartId = `cart-${hash(user.email)}`;

    dbCart.read(cartId, (err, cartData) => {
      if(err || !cartData) {
        responseCallback(404, {
          msg: 'Shopping cart not found',
        });
        return;
      }

      const { 
        name,
        phone,
        address,
      } = user;

      const orderId = randomString();
      const orderData = {
        orderId,
        delivery: {
          name,
          phone,
          address,
        },
        ...cartData,
        status: 'pending payment',
      };

      dbOrder.create(orderId, orderData, (err) => {
        if(err) {
          responseCallback(500, {
            msg: 'Unable to create new order',
          });
          logger.error('Error creating order', err);
          return;
        }

        responseCallback(200, orderData);
        // Clear current cart after order is created successfully.
        dbCart.delete(cartId, (err) => {
          if(err) {
            logger.warn('Error clearing cart.', err);
          }
          logger.info('Cart clared', cartId);
        });
      });
    });
  }
};

module.exports = makeCheckout;
