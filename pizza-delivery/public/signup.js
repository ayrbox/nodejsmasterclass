app.on('afterInit', function () {
  var alerts = document.querySelectorAll('.alert');
  for (var idx = 0; idx < alerts.length; idx++) {
    alerts[idx].style.display = 'none';
  }

  app.bindForm('signupForm');
});

app.on('response', function (args) {
  var responsePayload = args.responsePayload;

  var error =
    typeof responsePayload.message == 'string'
      ? responsePayload.message
      : 'API request is successful';

  var formSuccess = document.querySelector(
    '#' + args.formId + ' .alert-success'
  );
  formSuccess.innerHTML = error;
  formSuccess.style.display = 'block';
});

app.on('response-error', function (args) {
  var responsePayload = args.responsePayload;

  var error =
    typeof responsePayload.message == 'string'
      ? responsePayload.message
      : 'An error has occured, please try again';

  var formError = document.querySelector('#' + args.formId + ' .alert-danger');
  formError.innerHTML = error;
  formError.style.display = 'block';
});
