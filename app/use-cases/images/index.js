const makeResizeImage = require("./resize-image");

const resizeImage = makeResizeImage();

module.exports = Object.freeze({
  resizeImage,
});
