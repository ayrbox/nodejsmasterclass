const { printHorizonatalLine, padSpace, toTitleCase } = require("../utils");

const printOrder = function(order) {
  const { orderId, delivery, items, total, payment, orderCreated } = order;
  const { name, phone, address, email } = delivery;

  console.log(padSpace("ID:", "LEFT", 14), orderId);
  console.log(padSpace("Delivery:", "LEFT", 14), name);
  console.log(padSpace("", "LEFT", 14), phone);
  console.log(padSpace("", "LEFT", 14), address);
  console.log(padSpace("", "LEFT", 14), email);
  console.log(padSpace("Total: ", "LEFT", 14), total.toFixed(2));
  console.log(padSpace("Payment:", "LEFT", 14), toTitleCase(payment.status));
  console.log(
    padSpace("Timestamp:", "LEFT", 14),
    new Date(orderCreated).toString()
  );
  console.log("Order Items:");
  console.log(
    padSpace("Name", "LEFT", 30),
    padSpace("Qty", "RIGHT", 8),
    padSpace("Price", "RIGHT", 8),
    padSpace("Amount", "RIGHT", 8)
  );
  items.forEach(({ name, option, quantity, amount }) => {
    console.log(
      padSpace(
        `${toTitleCase(name)} (${toTitleCase(option.name)})`,
        "LEFT",
        30
      ),
      padSpace(quantity.toFixed(2), "RIGHT", 8),
      padSpace(option.price.toFixed(2), "RIGHT", 8),
      padSpace(amount.toFixed(2), "RIGHT", 8)
    );
  });
  printHorizonatalLine();
};

const makeOrderHandler = function({ db, fileLogger }) {
  return function(command, options) {
    if (options.id) {
      const orderId = options.id;
      db.read(orderId, function(errorOrder, orderData) {
        if (errorOrder) {
          console.log(`Unexpected error reading order for ${orderId}`);
          return;
        }
        printOrder(orderData);
      });
      return;
    }

    fileLogger.readLog(function(err, data) {
      if (err) {
        console.log("Unexpected error reading orders");
        return;
      }

      const logs = data.split(/\r?\n/);
      logs.forEach(logData => {
        try {
          if (logData.trim()) {
            const order = JSON.parse(logData.trim());
            printOrder(order);
          }
        } catch {}
      });
    });
  };
};

module.exports = makeOrderHandler;
