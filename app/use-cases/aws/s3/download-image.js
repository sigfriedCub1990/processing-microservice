const { GetObjectCommand } = require("@aws-sdk/client-s3");

function makeDownloadImage({ s3Client }) {
  return async (uuid) => {
    try {
      const getObjectCommand = new GetObjectCommand({
        Bucket: "photoservice",
        Key: uuid,
      });
      return await s3Client.send(getObjectCommand);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = makeDownloadImage;
