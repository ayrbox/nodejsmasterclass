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
