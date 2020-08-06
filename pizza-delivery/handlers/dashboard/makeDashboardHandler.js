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
        title: "Dashboard"
      },
      "_layout.tpl.html"
    );
  };
};
