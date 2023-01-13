const sqsModule = require("./sqs");
const s3Module = require("./s3");

module.exports = {
  ...sqsModule,
  ...s3Module,
};
