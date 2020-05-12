const { hash } = require('../../lib/cryptoHash');

const makeDeleteCartItem = function ({ db, dbMenu }) {
  return function ({ payload, user }, repsonseCallback) {
    const { menuId, size } = payload;

    dbMenu.read(menuId, (err, menu) => {
      if (err || !menu) {
        repsonseCallback(404, {
          msg: 'Menu item not found',
        });
        return;
      }

      const { options } = menu;
      const option = options.find(({ name }) => name === size);

      if (!option) {
        repsonseCallback(400, {
          msg: 'Invalid option selected',
        });
        return;
      }

      const itemToDelete = {
        menuId,
        option,
      };

      const cartId = `cart-${hash(user.email)}`;
      db.read(cartId, (err, cartData) => {
        if (err || !cartData) {
          repsonseCallback(404, {
            msg: 'Unable to find cart.',
          });
          return;
        }

        const items = [...cartData.items];
        const itemIndexToDelete = items.findIndex(i => {
          return (
            i.menuId === itemToDelete.menuId &&
            i.option.name === itemToDelete.option.name
          );
        });

        if (itemIndexToDelete < 0) {
          repsonseCallback(404, {
            msg: 'Unable to find menu item in cart',
          });
          return;
        }

        items.splice(itemIndexToDelete, 1);

        const updatedData = {
          items,
          total: items.reduce((t, { amount }) => t + amount, 0),
        };

        db.update(cartId, updatedData, err => {
          if (err) {
            repsonseCallback(500, {
              msg: 'Unable to update cart.',
            });
            return;
          }
          repsonseCallback(200, updatedData);
        });
      });
    });
  };
};

module.exports = makeDeleteCartItem;
