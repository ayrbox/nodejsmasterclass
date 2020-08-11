const {
  addCartItem,
  updateCartItem,
  deleteCartItem,
  getCart,
  deleteCart
} = require("../handlers/cart");

console.log(">>>>>>>>>>>>>>>>>>>>", addCartItem);

module.exports = [
  {
    path: "api/cartitem",
    method: "POST",
    handler: addCartItem,
    secure: true
  },
  {
    path: "api/cartitem",
    method: "PUT",
    handler: updateCartItem,
    secure: true
  },
  {
    path: "api/cartitem",
    method: "DELETE",
    handler: deleteCartItem,
    secure: true
  },
  {
    path: "api/cart",
    method: "GET",
    handler: getCart,
    secure: true
  },
  {
    path: "api/cart",
    method: "DELETE",
    handler: deleteCart,
    secure: true
  }
];
