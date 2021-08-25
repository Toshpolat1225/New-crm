const fs = require("fs");
const path = require("path");

module.exports = (filePath) => {
  if (filePath) {
    fs.unlink(path.join(__dirname, "../public/images/" + filePath), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};
