const { hash } = require("../../lib/cryptoHash");

const makeUpdateCartItem = function ({ db, dbMenu }) {
  return function ({ payload, user }, responseCallback) {
    const { menuId, quantity, size } = payload;

    dbMenu.read(menuId, (err, menu) => {
      if (err || !menu) {
        responseCallback(404, {
          msg: "Menu item not found"
        });
        return;
      }

      const { name, options } = menu;
      const option = options.find(({ name }) => name === size);
      if (!option) {
        responseCallback(400, {
          msg: "Invalid options selected"
        });
        return;
      }

      const itemToUpdate = {
        menuId,
        name,
        quantity,
        option
      };

      // Read data from cart
      const cartId = `cart-${hash(user.email)}`;
      db.read(cartId, (err, cartData) => {
        if (err || !cartData) {
          responseCallback(500, {
            msg: "Unable to find cart."
          });
          return;
        }

        // update cart here
        const items = [...(cartData.items || [])]; //immutable
        const itemFoundIndex = items.findIndex(i => {
          return (
            i.menuId === itemToUpdate.menuId &&
            i.option.name === itemToUpdate.option.name
          );
        });

        if (itemFoundIndex < 0) {
          responseCallback(404, {
            msg: "Unable to find menu item in cart"
          });
          return;
        }

        items.splice(itemFoundIndex, 1);

        const updatedItems = [...items, itemToUpdate].map(item => ({
          ...item,
          amount: item.quantity * item.option.price // calculate amount for each item
        }));

        const updatedData = {
          items: updatedItems,
          total: updatedItems.reduce((t, { amount }) => t + amount, 0) // cart total
        };

        db.update(cartId, updatedData, err => {
          if (err) {
            responseCallback(500, {
              msg: "Unable to update cart."
            });
            return;
          }
          responseCallback(200, updatedData);
        });
      });
    });
  };
};

module.exports = makeUpdateCartItem;
