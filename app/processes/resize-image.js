const { uploadFile, downloadFile, sendMessage } = require("../use-cases/aws");
const { resizeImage } = require("../use-cases/images");
const logger = require("../logger");

const resizeImageProcess = async (job) => {
  try {
    logger.log({ level: "info", message: "Processing image job started." });
    const { key, width, height } = job.data;
    const file = await downloadFile(key);
    const byteArray = await file.Body.transformToByteArray();
    const resizedImage = await resizeImage({
      imgBuffer: byteArray,
      width: Number.parseInt(width, 10),
      height: Number.parseInt(height, 10),
    });
    await uploadFile({ file: resizedImage, uuid: key });
    const completionMessage = JSON.stringify({ key });
    return await sendMessage({ message: completionMessage });
  } catch (error) {
    logger.log({ level: "error", message: error.stack });
    logger.log({ level: "error", message: error.message });
    throw new Error(error.meessage);
  }
};

module.exports = resizeImageProcess;
