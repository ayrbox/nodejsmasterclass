app.on("afterInit", function() {
  app.bindForm("account-detail");
  app.getUser();
});

app.on("user-updated", function(user) {
  var fields = ["name", "email", "phone", "address"];
  for (var field of fields) {
    document.querySelector("#userForm #" + field).value = user[field];
  }
});

app.on("response", function() {
  var alertEl = document.querySelector("#alert");
  if (alertEl) {
    alertEl.classList.remove("d-none");
    alertEl.classList.add("alert-success");
    alertEl.innerHTML = "Account profile updated";
  }
});

app.on("response-error", function(args) {
  var responsePayload = args.responsePayload;

  var alertEl = document.querySelector("#alert");
  if (alertEl) {
    alertEl.classList.remove("d-none");
    alertEl.classList.add("alert-danger");
    alertEl.innerHTML = "Error updateing profile <br>" + responsePayload.msg;
  }
});
