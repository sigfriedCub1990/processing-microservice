const { S3Client } = require("@aws-sdk/client-s3");

const makeDownloadImage = require("./download-image");
const makeUploadImage = require("./upload-image");

const s3Client = new S3Client({
  endpoint: `http://127.0.0.1:4566`, // TODO: Figure how to read ENV variable here
});

const uploadFile = makeUploadImage({ s3Client });
const downloadFile = makeDownloadImage({ s3Client });

module.exports = {
  uploadFile,
  downloadFile,
};
