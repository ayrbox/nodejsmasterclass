var app = {};

app.config = {
  sessionToken: false,
};

// Ajax cleint
app.client = {};

app.client.request = function (
  path = '/',
  method = 'GET',
  queryString = {},
  headers = {},
  payload = undefined,
  callback = undefined
) {
  // Prepare request url with query string
  const qs = Object.entries(queryString)
    .map(function ([key, value]) {
      return `${key}=${value}`;
    })
    .join('&');

  const requestUrl = `${path}/?${qs}`;
  console.log(requestUrl);

  const xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  // add headers to request

  for (const [key, value] of Object.entries(headers)) {
    console.log(key, value);
    xhr.setRequestHeader(key, value);
  }

  // add session token id if exists
  if (app.config.sessionToken) {
    xhr.setRequestHeader('token', app.config.sessionToken.id);
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      const statusCode = xhr.status;
      const responseReturned = xhr.responseText;

      if (callback) {
        try {
          const parsedResponse = JSON.parse(responseReturned);
          callback(statusCode, parsedResponse);
        } catch (e) {
          callback(statusCode, false);
        }
      }
    }
  };

  const payloadString = JSON.stringify(payload);
  xhr.send(payloadString);
};

app.client.request(
  '/ping',
  'GET',
  { hello: 'world' },
  { 'X-Tauko': 'Terotauko' },
  {},
  function (statusCode, payload) {
    console.log(statusCode, payload);
  }
);
