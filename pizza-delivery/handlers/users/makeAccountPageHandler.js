module.exports = function(render, appData) {
  return function(data, callback) {
    render(
      "account.tpl.html",
      function(err, content) {
        if (err) {
          callback(500, err);
          return;
        }
        callback(200, content, "text/html");
      },
      {
        ...appData,
        title: "Account",
        description: "Account Profile Page"
      },
      "_layout.tpl.html"
    );
  };
};
