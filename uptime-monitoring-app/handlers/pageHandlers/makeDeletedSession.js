module.exports = function (render, appData) {
  return function (data, callback) {
    render(
      'deletedSession.html',
      function (err, content) {
        if (err) {
          callback(500, err);
          return;
        }
        callback(200, content, 'text/html');
      },
      {
        ...appData,
        title: 'Logged Out',
        message: '',
      },
      '_layout.html'
    );
  };
};
