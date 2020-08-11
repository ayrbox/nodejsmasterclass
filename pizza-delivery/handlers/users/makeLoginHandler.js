module.exports = function (render, appData) {
  return function (data, callback) {
    render(
      'login/login.tpl.html',
      function (err, content) {
        if (err) {
          callback(500, err);
          return;
        }
        callback(200, content, 'text/html');
      },
      {
        ...appData,
        title: 'Login',
        description: 'Please enter your credential to accces.',
        message: '',
      },
      '_loginLayout.tpl.html'
    );
  };
};
