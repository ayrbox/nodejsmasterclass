const { printHorizonatalLine, padSpace, toTitleCase } = require("../utils");

const makeMenuHandler = function({ db }) {
  return function() {
    db.list(function(err, data) {
      if (err || !data) {
        console.log("Unable to read menu", err);
        return;
      }

      data.forEach(menu => {
        const { id, name, description, options } = menu;

        console.log(padSpace("ID:", "LEFT", 14), id.toUpperCase());
        console.log(padSpace("Name:", "LEFT", 14), name);
        console.log(padSpace("Description:", "LEFT", 14), description);
        console.log("Options:");
        console.log(
          "   ",
          padSpace("Size", "LEFT", 10),
          padSpace("Description", "LEFT", 15),
          padSpace("Price", "RIGHT", 6)
        );
        options.forEach(option => {
          console.log(
            "   ",
            padSpace(toTitleCase(option.name), "LEFT", 10),
            padSpace(option.description, "LEFT", 15),
            padSpace(option.price.toFixed(2), "RIGHT", 6)
          );
        });
        printHorizonatalLine();
      });
    });
  };
};

module.exports = makeMenuHandler;
