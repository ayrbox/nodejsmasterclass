module.exports = function (render) {
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
        title: 'Home',
        message: 'Hello world :). I like it',
      },
      '_layout.html'
    );
  };
};
