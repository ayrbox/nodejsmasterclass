const { hash } = require('../../lib/cryptoHash');

const makeAddCartItem = function ({ db, dbMenu }) {
  /**
   *
   * @param {string} cartId Unique cart id for user
   * @param {array} data Array or items
   * @param {object} itemToAdd Item Object
   */
  const updateCart = function (cartId, cart = {}, itemToAdd, callback) {
    const rawItems = [...(cart.items || []), itemToAdd];

    // Aggregrate items by menuId and size
    const items = rawItems
      .reduce((aggregatedResult, itemToCheck) => {
        const itemFound = aggregatedResult.find(itemToFind => {
          return (
            itemToFind.menuId === itemToCheck.menuId &&
            itemToFind.option.name === itemToCheck.option.name
          );
        });

        const quantity =
          ((itemFound && itemFound.quantity) || 0) + itemToCheck.quantity;

        const itemFoundIdx = aggregatedResult.indexOf(itemFound);
        if (itemFoundIdx > -1) {
          aggregatedResult.splice(itemFoundIdx, 1);
        }

        return [
          ...aggregatedResult,
          {
            ...itemToCheck,
            quantity,
          },
        ];
      }, [])
      .map(item => ({
        ...item,
        amount: item.quantity * item.option.price, // calculate amount for each item
      }));

    const updatedData = {
      items,
      total: items.reduce((t, { amount }) => t + amount, 0), // calculate cart total
    };

    db.update(cartId, updatedData, err => {
      if (err) {
        callback(new Error('Unable to update cart.'), null);
        return;
      }
      callback(false, updatedData);
    });
  };

  // read payload
  return function ({ payload, user }, responseCallback) {
    const { menuId, quantity, size } = payload;

    // get menu
    dbMenu.read(menuId, (err, menu) => {
      if (err || !menu) {
        responseCallback(404, {
          msg: 'Menu Item not found',
        });
        return;
      }

      const { name, options } = menu;
      const option = options.find(({ name }) => name === size); // find size selected
      if (!option) {
        responseCallback(400, {
          msg: 'Invalid option selected',
        });
        return;
      }

      const itemToAdd = {
        menuId,
        name,
        quantity,
        option,
      };

      // Read data from cart
      const cartId = `cart-${hash(user.email)}`;
      db.read(cartId, (err, cartData) => {
        // create cart
        if (err || !cartData) {
          // Create new cart file if does not exists
          db.create(cartId, {}, err => {
            if (err) {
              responseCallback(500, {
                message: 'Unable to create cart.',
              });
              return;
            }

            updateCart(cartId, [], itemToAdd, (err, data) => {
              if (err) {
                responseCallback(500, {
                  msg: 'Unable to add item to cart.',
                });
                return;
              }

              responseCallback(200, data);
              return;
            });
          });

          return;
        }
        updateCart(cartId, cartData, itemToAdd, (err, data) => {
          if (err) {
            responseCallback(500, {
              msg: 'Unable to add item to cart.',
            });
            return;
          }
          responseCallback(200, data);
        });
      });
    });
  };
};

module.exports = makeAddCartItem;
