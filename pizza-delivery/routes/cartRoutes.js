const {
  addToCart,
} = require('../handlers/cart');

module.exports = [{
  path: '/add-to-cart',
  method: 'PUT',
  handler: addToCart,
  secure: true,
}];
