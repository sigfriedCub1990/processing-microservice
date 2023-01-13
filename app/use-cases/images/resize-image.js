const sharp = require("sharp");

function makeResizeImage() {
  return async ({ imgBuffer, width, height }) => {
    try {
      const resizedImage = await sharp(imgBuffer)
        .resize(width, height)
        .toBuffer();
      return resizedImage;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = makeResizeImage;
