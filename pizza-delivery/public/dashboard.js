var getOrderHtml = function(order) {
  var itemsHTML = "";
  for (var idx = 0; idx < order.items.length; idx++) {
    var item = order.items[idx];
    var itemName = item.name + " (" + item.option.name + ")";
    itemsHTML += `<li class="d-flex justify-content-between">
      <span>${itemName.padEnd(100, ".")}</span>
      <span>Qty: ${item.quantity.toFixed(2)}</span>
      <span>Price: ${item.option.price.toFixed(2)}</span>
    </li>`;
  }

  return `<div class="w-100">
    <ul class="list-unstyled pr-5">${itemsHTML}</ul>
    <div class="d-flex w-100 justify-content-between">
      <p class="pt-3"><strong>Order Id:</strong>${order.orderId}</p>
      <p><strong>Total: </strong>${order.total.toFixed(2)}</p>
    </div>
  </div>
  <hr />
  `;
};

var loadOrderHistory = function(statusCode, responsePayload) {
  if (!responsePayload) {
    return;
  }
  if (statusCode == 200) {
    var orders = responsePayload;
    var ordersHtml = "";
    for (var idx = 0; idx < orders.length; idx++) {
      ordersHtml += getOrderHtml(orders[idx]);
    }
    document.querySelector("#order-history-container").innerHTML = ordersHtml;
  }
};

app.on("afterInit", function() {
  app.request(
    undefined,
    "api/order/history",
    "GET",
    undefined,
    undefined,
    loadOrderHistory
  );
});
