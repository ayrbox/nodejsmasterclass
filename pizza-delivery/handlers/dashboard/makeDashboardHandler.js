module.exports = function(render, appData) {
  return function(data, callback) {
    render(
      "dashboard.tpl.html",
      function(err, content) {
        if (err) {
          callback(500, err);
          return;
        }
        callback(200, content, "text/html");
      },
      {
        ...appData,
        title: "Pizza Delivery",
        description: "Welcome to Pizza Delivery Service"
      },
      "_layout.tpl.html"
    );
  };
};
