module.exports = function (render, appData) {
  return function (data, callback) {
    render(
      'editCheck.html',
      function (err, content) {
        if (err) {
          callback(500, err);
          return;
        }
        callback(200, content, 'text/html');
      },
      {
        ...appData,
        title: 'Edit Checks',
        bodyClass: 'checksEdit',
      },
      '_layout.html'
    );
  };
};
