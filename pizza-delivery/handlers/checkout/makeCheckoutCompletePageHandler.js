module.exports = function(render, appData) {
  return function(data, callback) {
    render(
      "checkout-complete.tpl.html",
      function(err, content) {
        if (err) {
          callback(500, err);
          return;
        }
        callback(200, content, "text/html");
      },
      {
        ...appData,
        title: "Checkout Complete",
        description: "Your order has been placed successfully"
      },
      "_layout.tpl.html"
    );
  };
};
