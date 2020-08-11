const path = require('path');
const fs = require('fs');

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
  return function (viewFile, callback, data = {}, layoutView = undefined) {
    const filePath = path.join(viewFolder, viewFile);

    fs.readFile(filePath, 'utf8', function (err, content) {
      if (err) {
        callback(new Error('Unable render template.'));
        return;
      }

      const pageHtml = templateEngine(content, data);

      if (!layoutView) {
        callback(false, pageHtml);
        return;
      }

      const layout = path.join(viewFolder, layoutView);
      fs.readFile(layout, 'utf8', function (err, layoutContent) {
        console.log(err, layoutContent);
        if (err) {
          callback(new Error('Layout not found.'));
          return;
        }

        const layoutData = { content: pageHtml, ...data };
        const resultHtml = templateEngine(layoutContent, layoutData);
        callback(false, resultHtml);
      });
    });
  };
}

module.exports = makeRender;
