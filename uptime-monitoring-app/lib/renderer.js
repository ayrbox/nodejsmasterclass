const path = require("path");
const fs = require("fs");

function templateEngine(templateString, data) {
  const regEx = /<%([^%>]+)?%>/g;
  let match;
  let tpl = templateString;
  while ((match = regEx.exec(templateString))) {
    const [key, value] = match;

    tpl = tpl.replace(key, data[value]);
  }
  return tpl;
}

function makeRender(viewFolder) {
  return function(viewFile, callback, layoutView = undefined) {
    // TODO: if layout view provided wrap the content withint layoutView content
    const filePath = path.join(viewFolder, viewFile);

    fs.readFile(filePath, "utf8", function(err, content) {
      if (err) {
        callback(new Error("Unable render template."));
        return;
      }

      if (!layoutView) {
        callback(false, content);
        return;
      }

      const layout = path.join(viewFolder, layoutView);
      fs.readFile(layout, "utf8", function(err, layoutContent) {
        if (err) {
          callback(new Error("Layout not found."));
          return;
        }

        const data = { content };
        const resultHtml = templateEngine(layoutContent, data);
        callback(false, resultHtml);
      });
    });
  };
}

module.exports = makeRender;
