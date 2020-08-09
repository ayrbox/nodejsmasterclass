var App = function() {
  this.events = {};
  this.config = {
    sessionToken: false
  };
  this.cart = undefined;
};

/**
 * Polyfill for EventEmitter
 */
var indexOf;

if (typeof Array.prototype.indexOf === "function") {
  indexOf = function(haystack, needle) {
    return haystack.indexOf(needle);
  };
} else {
  indexOf = function(haystack, needle) {
    var i = 0,
      length = haystack.length,
      idx = -1,
      found = false;

    while (i < length && !found) {
      if (haystack[i] === needle) {
        idx = i;
        found = true;
      }

      i++;
    }

    return idx;
  };
}

// Event Emitter for app
App.prototype.on = function(event, listener) {
  if (typeof this.events[event] !== "object") {
    this.events[event] = [];
  }
  this.events[event].push(listener);
};

App.prototype.removeListener = function(event, listener) {
  var idx;
  if (typeof this.events[event] === "object") {
    idx = indexOf(this.events[event], listener);
    if (idx > -1) {
      this.events[event].splice(idx, 1);
    }
  }
};

App.prototype.emit = function(event) {
  var i,
    listeners,
    length,
    args = [].slice.call(arguments, 1);
  if (typeof this.events[event] === "object") {
    listeners = this.events[event].slice();
    length = listeners.length;
    for (i = 0; i < length; i++) {
      listeners[i].apply(this, args);
    }
  }
};

App.prototype.once = function(event, listener) {
  this.on(event, function g() {
    this.removeListener(event, g);
    listener.apply(this, arguments);
  });
};

// Interface for making API calls
App.prototype.request = function(
  headers,
  path,
  method,
  queryStringObject,
  payload,
  callback
) {
  const _self = this;
  // Set defaults
  headers = typeof headers == "object" && headers !== null ? headers : {};
  path = typeof path == "string" ? path : "/";

  method =
    typeof method == "string" &&
    ["POST", "GET", "PUT", "DELETE"].indexOf(method.toUpperCase()) > -1
      ? method.toUpperCase()
      : "GET";
  queryStringObject =
    typeof queryStringObject == "object" && queryStringObject !== null
      ? queryStringObject
      : {};
  payload = typeof payload == "object" && payload !== null ? payload : {};
  callback = typeof callback == "function" ? callback : false;

  // For each query string parameter sent, add it to the path
  var requestUrl = path;
  var counter = 0;
  for (var queryKey in queryStringObject) {
    if (queryStringObject.hasOwnProperty(queryKey)) {
      counter++;
      // If at least one query string parameter has already been added, preprend new ones with an ampersand
      requestUrl += counter == 1 ? "?" : "&";
      // Add the key and value
      requestUrl += queryKey + "=" + queryStringObject[queryKey];
    }
  }

  // Form the http request as a JSON type
  var xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");

  // For each header sent, add it to the request
  for (var headerKey in headers) {
    if (headers.hasOwnProperty(headerKey)) {
      xhr.setRequestHeader(headerKey, headers[headerKey]);
    }
  }

  // If there is a current session token set, add that as a header
  if (this.config.sessionToken) {
    xhr.setRequestHeader("token", _self.config.sessionToken);
  }

  // When the request comes back, handle the response
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var statusCode = xhr.status;
      var responseReturned = xhr.responseText;

      // Callback if requested
      if (callback) {
        try {
          var parsedResponse = JSON.parse(responseReturned);
          callback(statusCode, parsedResponse);
        } catch (e) {
          console.error("Callback Error on requst", e);
          callback(statusCode, false);
        }
      }
    }
  };

  // Send the payload as JSON
  var payloadString = JSON.stringify(payload);
  xhr.send(payloadString);
};

/**
 * Method to bind page forms to make api request instead of form post
 */
App.prototype.bindForm = function(formId) {
  var formSelector = "#" + formId;
  var _self = this;

  if (document.querySelector(formSelector)) {
    var formList = document.querySelectorAll(formSelector);

    if (formList.length > 1) {
      console.warn("More than 1 form is detected with same id.", "#" + formId);
    }

    const theForm = formList[0];

    theForm.addEventListener("submit", function(e) {
      e.preventDefault();
      var formId = this.id;
      var path = this.action;
      var method = this.method.toUpperCase();

      // Turn the inputs into a payload
      var payload = {};
      var elements = this.elements;
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].type !== "submit") {
          // Determine class of element and set value accordingly
          var classOfElement =
            typeof elements[i].classList.value == "string" &&
            elements[i].classList.value.length > 0
              ? elements[i].classList.value
              : "";
          var valueOfElement =
            elements[i].type == "checkbox" &&
            classOfElement.indexOf("multiselect") == -1
              ? elements[i].checked
              : classOfElement.indexOf("intval") == -1
              ? elements[i].value
              : parseInt(elements[i].value);
          var elementIsChecked = elements[i].checked;
          // Override the method of the form if the input's name is _method
          var nameOfElement = elements[i].name;
          if (nameOfElement == "_method") {
            method = valueOfElement;
          } else {
            // Create an payload field named "method" if the elements name is actually httpmethod
            if (nameOfElement == "httpmethod") {
              nameOfElement = "method";
            }
            // Create an payload field named "id" if the elements name is actually uid
            if (nameOfElement == "uid") {
              nameOfElement = "id";
            }
            // If the element has the class "multiselect" add its value(s) as array elements
            if (classOfElement.indexOf("multiselect") > -1) {
              if (elementIsChecked) {
                payload[nameOfElement] =
                  typeof payload[nameOfElement] == "object" &&
                  payload[nameOfElement] instanceof Array
                    ? payload[nameOfElement]
                    : [];
                payload[nameOfElement].push(valueOfElement);
              }
            } else {
              payload[nameOfElement] = valueOfElement;
            }
          }
        }
      }

      // If the method is DELETE, the payload should be a queryStringObject instead
      var queryStringObject = method == "DELETE" ? payload : {};

      // Call the API
      _self.request(
        undefined,
        path,
        method,
        queryStringObject,
        payload,
        function(statusCode, responsePayload) {
          if (statusCode !== 200 && statusCode !== 201) {
            if (statusCode == 403) {
              _self.destorySessionToken(true);
              _self.emit("logout");
            }
            _self.emit("response-error", { formId, payload, responsePayload });
          } else {
            // If successful, send to form response processor
            _self.emit("response", { formId, payload, responsePayload });
          }
        }
      );
    });
  } else {
    console.error("Form with the Id #" + formId + " not found.");
  }
};

// Get the session token from localstorage and set it in the app.config object
App.prototype.getSessionToken = function() {
  var tokenString = localStorage.getItem("token");
  if (typeof tokenString == "string") {
    try {
      var token = JSON.parse(tokenString);
      this.config.sessionToken = token;

      document.cookie = "token=" + token + ";";
      this.emit("session");
    } catch (e) {
      this.config.sessionToken = false;
    }
  }
};

// Set the session token in the app.config object as well as localstorage
App.prototype.setSessionToken = function(token) {
  app.config.sessionToken = token;
  var tokenString = JSON.stringify(token);
  localStorage.setItem("token", tokenString);
  document.cookie = "token=" + token + ";";
  this.emit("session");
};

App.prototype.destorySessionToken = function(redirectUser) {
  var _self = this;

  // Get the current token id
  var tokenId =
    typeof app.config.sessionToken == "string"
      ? app.config.sessionToken
      : false;

  // Send the current token to the tokens endpoint to delete it
  var queryString = {
    token: tokenId
  };

  _self.request(
    null,
    "api/tokens",
    "DELETE",
    queryString,
    undefined,
    function() {
      _self.config.sessionToken = false;
      localStorage.removeItem("token");
      document.cookie = undefined;
      if (redirectUser) {
        window.location = "/logged-out";
      }
    }
  );
};

App.prototype.bindLogoutButton = function() {
  const logoutButton = document.getElementById("btnLogout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function(e) {
      e.preventDefault();
      app.destorySessionToken(true);
    });
  }
};

App.prototype.refreshCart = function() {
  var _self = this;
  _self.request(null, "api/cart", "GET", undefined, undefined, function(
    statusCode,
    responsePayload
  ) {
    if (statusCode === 200) {
      _self.cart = responsePayload;
      _self.emit("cart-refresh");
    }
  });
};

var app = new App();
app.init = function() {
  app.emit("beforeInit");
  app.getSessionToken();
  app.bindLogoutButton();
  app.emit("afterInit");
};

window.onload = function() {
  app.init();
};
