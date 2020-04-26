const {
  addCartItem,
  updateCartItem,
  deleteCartItem,
  getCart,
  deleteCart
} = require("../handlers/cart");

module.exports = [
  {
    path: "/cartitem",
    method: "POST",
    handler: addCartItem,
    secure: true
  },
  {
    path: "/cartitem",
    method: "PUT",
    handler: updateCartItem,
    secure: true
  },
  {
    path: "/cartitem",
    method: "DELETE",
    handler: deleteCartItem,
    secure: true
  },
  {
    path: "/cart",
    method: "GET",
    handler: getCart,
    secure: true
  },
  {
    path: "/cart",
    method: "DELETE",
    handler: deleteCart,
    secure: true
  }
];
