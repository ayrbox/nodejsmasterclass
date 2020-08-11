module.exports = function(render, appData) {
  return function(data, callback) {
    render(
      "checkout.tpl.html",
      function(err, content) {
        if (err) {
          callback(500, err);
          return;
        }
        callback(200, content, "text/html");
      },
      {
        ...appData,
        title: "Checkout",
        description: "Proceed with checkout"
      },
      "_layout.tpl.html"
    );
  };
};
