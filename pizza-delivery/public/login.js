app.on("afterInit", function() {
  var alerts = document.querySelectorAll(".alert");
  for (var idx = 0; idx < alerts.length; idx++) {
    alerts[idx].style.display = "none";
  }

  app.bindForm("loginForm");
});

app.on("response", function(args) {
  var responsePayload = args.responsePayload;
  var requestPayload = args.payload;

  if (responsePayload.token) {
    app.setSessionToken(responsePayload.token, requestPayload.email);
  }

  var formSuccess = document.querySelector(
    "#" + args.formId + " .alert-success"
  );
  formSuccess.innerHTML = "Login successfull. Redirecting";
  formSuccess.style.display = "block";

  window.location = "/dashboard";
});

app.on("response-error", function(args) {
  var responsePayload = args.responsePayload;

  var error =
    typeof responsePayload.message == "string"
      ? responsePayload.message
      : "An error has occured, please try again";

  var formError = document.querySelector("#" + args.formId + " .alert-danger");
  formError.innerHTML = error;
  formError.style.display = "block";
});
