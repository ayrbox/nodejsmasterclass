app.on("afterInit", function() {
  app.getUser();
  app.refreshCart();

  app.bindForm("payment-form");
});

app.on("cart-refresh", function() {
  var listEl = document.querySelector("#list-items");
  var itemsHtml = "";

  for (var item of app.cart.items) {
    itemsHtml += `
    <li class="list-group-item d-flex justify-content-between lh-condensed" data-id="${
      item.menuId
    }">
      <div>
        <h6 class="my-0">${item.name}</h6
        <small class="text-muted">Size: ${item.option.name} | Price: ${
      item.option.price
    } | Qty: ${item.quantity}</small>
      </div>
      <span class="text-muted">${item.amount.toFixed(2)}</span>
    </li>`;
  }
  itemsHtml += `
    <li class="list-group-item d-flex justify-content-between">
      <span>Total</span>
      <strong>${app.cart.total.toFixed(2)}</strong>
    </li>`;

  listEl.innerHTML = itemsHtml;
});

app.on("user-updated", function(user) {
  var fields = ["name", "email", "phone", "address"];
  for (var field of fields) {
    document.querySelector("#userForm #" + field).value = user[field];
  }
});

app.on("response", function() {
  window.location = "/checkout-completed";
});

app.on("response-error", function(args) {
  var responsePayload = args.responsePayload;
  var errorMessageEl = document.querySelector("#error-message");
  var errorMsg = "Unable to process checkout. Please try again";
  errorMsg += "<br/><em>" + responsePayload.msg + "</em>";

  errorMessageEl.innerHTML = errorMsg;
  errorMessageEl.classList.remove("d-none");
});
