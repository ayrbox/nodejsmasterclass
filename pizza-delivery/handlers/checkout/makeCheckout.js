const { hash } = require("../../lib/cryptoHash");
const { createPayment } = require("../../lib/stripePayment");
const createReceiptText = require("../../utils/createReceiptText");
const { sendEmail } = require("../../lib/mailgunClient");

const makeCheckout = function ({ dbCart, dbOrder, randomString, logger }) {
  return function ({ payload, user }, responseCallback) {
    const { cardType, cardNo, cvvCode, expiryDate } = payload;

    const cartId = `cart-${hash(user.email)}`;

    dbCart.read(cartId, (err, cartData) => {
      if (err || !cartData) {
        responseCallback(404, {
          msg: "Shopping cart not found"
        });
        return;
      }

      const { name, email, phone, address } = user;

      const orderId = randomString();

      // Create stripe payment intent
      createPayment(
        {
          orderId,
          customerId: `${name} (${email})`,
          amount: cartData.total,
          confirm: true,
          cardType,
          cardNo,
          cvvCode,
          expiryDate
        },
        function (err, detail) {
          if (err) {
            responseCallback(500, {
              msg: "Unable to create order payments"
            });
            logger.warning("Error creating payment", err, detail);
            return;
          }

          const { id: paymentId, payment_method: paymentMethod } = detail;

          const orderData = {
            orderId,
            delivery: {
              name,
              phone,
              address,
              email
            },
            ...cartData,
            payment: {
              paymentId,
              paymentMethod,
              status: "successful"
            }
          };
          dbOrder.create(orderId, orderData, err => {
            if (err) {
              responseCallback(500, {
                msg: "Unable to create new order"
              });
              logger.warning("Error creating order", err);
              return;
            }

            responseCallback(200, orderData);

            // Clear current cart after order is created successfully.
            dbCart.delete(cartId, err => {
              if (err) {
                logger.warning("Error clearing cart.", err);
              }
              logger.info("Cart clared", cartId);
            });

            // Send receipt in email
            const receiptText = createReceiptText(orderData);
            sendEmail(
              {
                to: email,
                subject: "Pizza: Order Receipt",
                text: receiptText
              },
              err => {
                if (err) {
                  logger.warning("Receipt not send" + err);
                } else {
                  logger.info("Receipt send");
                }
              }
            );
          });
        }
      );
    });
  };
};

module.exports = makeCheckout;
