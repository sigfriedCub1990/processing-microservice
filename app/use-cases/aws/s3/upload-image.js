const { PutObjectCommand } = require("@aws-sdk/client-s3");
// const { sendMessage } = require("../sqs");
// const { imageDb } = require("../../../data-access/");

function makeUploadImage({ s3Client }) {
  return async ({ file, uuid }) => {
    try {
      const command = new PutObjectCommand({
        Bucket: "photoservice",
        Body: file,
        Key: uuid,
      });
      const response = s3Client.send(command);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = makeUploadImage;
