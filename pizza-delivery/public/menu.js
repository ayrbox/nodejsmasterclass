function createMenuCard(menuItem) {
  var optHtml = "";
  for (var optIdx = 0; optIdx < menuItem.options.length; optIdx++) {
    opt = menuItem.options[optIdx];
    optHtml += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="option-${
          menuItem.id
        }" value="${opt.name}" id="option-${menuItem.id}-${opt.name}">
        <label class="form-check-label text-capitalize" for="option-${
          menuItem.id
        }-${opt.name}">
        ${opt.name} <small>(${opt.description})</small>
        </label>
      </div>
      <span class="badge badge-primary badge-pill">${opt.price}</span>
    </li>
    `;
  }

  const cardInnerHtml = `
    <div class="card-body">
      <h5 class="card-title">${menuItem.name}</h5>
      <p class="card-text">${menuItem.description}</p>
    </div>
    <ul class="list-group list-group-flush">
      ${optHtml}
    </ul>
    <div class="card-body">
      <a href="#" class="btn btn-primary" id="addToOrder">Add to Order</a>
    </div>
  `;

  const card = document.createElement("div");
  card.setAttribute("class", "card mr-3 mb-3");
  card.setAttribute("data-id", menuItem.id);
  card.innerHTML = cardInnerHtml;
  card.style.width = "18rem";

  return card;
}

app.on("afterInit", function() {
  app.request(undefined, "/api/menus", "GET", undefined, undefined, function(
    statusCode,
    payload
  ) {
    if (statusCode !== 200) {
      console.error("Unable to get menus.");
      return;
    }

    var container = document.getElementById("menuContainer");

    payload.forEach(menuItem => {
      const i = createMenuCard(menuItem);
      container.appendChild(i);
    });
  });
  app.refreshCart();
});

app.on("cart-refresh", function() {
  var cartTotalElement = document.getElementById("cart-total");
  var cartItemsElement = document.getElementById("cart-items");

  var cartItemCount = 0;
  var cartTotal = 0;

  if (app.cart) {
    var cartItems = app.cart.items;

    for (var itemIdx = 0; itemIdx < cartItems.length; itemIdx++) {
      cartItemCount += cartItems[itemIdx].quantity;
    }
    cartTotal = app.cart.total;
  }

  cartTotalElement.innerText = cartTotal.toFixed(2);
  cartItemsElement.innerText = cartItemCount.toFixed(0);
});

document.addEventListener(
  "click",
  function(e) {
    if (e.target.id == "addToOrder") {
      e.preventDefault();
      var addButtonEl = e.target;
      var cardEl = addButtonEl.closest(".card");
      console.log(cardEl);

      var menuItemId = cardEl.dataset.id;

      var menuOptionsEl = document.getElementsByName("option-" + menuItemId);
      var selectedOption = undefined;

      for (var optIdx = 0; optIdx < menuOptionsEl.length; optIdx++) {
        if (menuOptionsEl[optIdx].checked) {
          selectedOption = menuOptionsEl[optIdx].value;
        }
      }

      if (selectedOption) {
        app.request(
          null,
          "/api/cartitem",
          "POST",
          null,
          {
            menuId: menuItemId,
            quantity: 1,
            size: selectedOption
          },
          function(statusCode, responsePayload) {
            console.log(statusCode, responsePayload);
            if (statusCode == 200) {
              app.refreshCart();
            }
          }
        );
      } else {
        alert("Please select menu option.");
        console.error("Please selecte an option");
      }
    }
  },
  false
);
