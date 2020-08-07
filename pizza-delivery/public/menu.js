function createMenuCard(menuItem) {
  var optHtml = '';
  for (var optIdx = 0; optIdx < menuItem.options.length; optIdx++) {
    opt = menuItem.options[optIdx];
    optHtml += `
    <li class="list-group-item">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${menuItem.id}" value="${menuItem.id}" id="${menuItem.id}-${opt.name}">
        <label class="form-check-label" for="${menuItem.id}-${opt.name}">
        ${opt.description}
        </label>
      </div>
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

  const card = document.createElement('div');
  card.setAttribute('class', 'card mr-3 mb-3');
  card.setAttribute('data-id', menuItem.id);
  card.innerHTML = cardInnerHtml;
  card.style.width = '18rem';

  return card;
}

app.on('afterInit', function () {
  app.request(undefined, '/api/menus', 'GET', undefined, undefined, function (
    statusCode,
    payload
  ) {
    if (statusCode !== 200) {
      console.error('Unable to get menus.');
      return;
    }

    var container = document.getElementById('menuContainer');

    payload.forEach(menuItem => {
      const i = createMenuCard(menuItem);
      container.appendChild(i);
    });
  });
});

// $('#menuContainer').on('click', 'a#addToOrder', function (e) {
//   e.preventDefault();
//   console.log($(this).text());
// });

document.addEventListener(
  'click',
  function (e) {
    if (e.target.id == 'addToOrder') {
      e.preventDefault();
      console.log('targe >>>>>>>>>>', e.target.id);
    }
  },
  false
);
