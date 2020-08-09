app.on("afterInit", function() {
  app.getUser();
  app.refreshCart();
});

app.on("cart-refresh", function() {
  console.log(app.cart);
});

app.on("user-updated", function(user) {
  var fields = ["name", "email", "phone", "address"];
  for (var field of fields) {
    document.querySelector("#userForm #" + field).value = user[field];
  }
});
