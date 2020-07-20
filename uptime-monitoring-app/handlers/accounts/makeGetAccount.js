module.exports = function (render, appData) {
  return function (data, callback) {
    render(
      'index.html',
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
        message: '',
      },
      '_layout.html'
    );
  };
};
