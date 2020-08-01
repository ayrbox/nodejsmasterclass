module.exports = function (render, appData) {
  return function (data, callback) {
    render(
      'accountDeleted.html',
      function (err, content) {
        if (err) {
          callback(500, err);
          return;
        }
        callback(200, content, 'text/html');
      },
      {
        ...appData,
        title: 'Home',
        bodyClass: 'accountEdit',
      },
      '_layout.html'
    );
  };
};
