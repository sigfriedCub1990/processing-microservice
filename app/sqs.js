const { SQSClient } = require("@aws-sdk/client-sqs");

const sqsConfig = {
  region: "us-east-1",
};

if (process.env.SQS_ENDPOINT) {
  sqsConfig.endpoint = process.env.SQS_ENDPOINT;
} else if (process.env.NODE_ENV === "development") {
  sqsConfig.endpoint = "http://127.0.0.1:4566";
}

if (process.env.SQS_ACCESS_KEY_ID || process.env.NODE_ENV === "development") {
  sqsConfig.credentials = {};
}
if (process.env.SQS_ACCESS_KEY_ID) {
  sqsConfig.credentials.accessKeyId = process.env.SQS_ACCESS_KEY_ID;
} else if (process.env.NODE_ENV === "development") {
  sqsConfig.credentials.accessKeyId = "na";
}
if (process.env.SQS_SECRET_ACCESS_KEY) {
  sqsConfig.credentials.secretAccessKey = process.env.SQS_SECRET_ACCESS_KEY;
} else if (process.env.NODE_ENV === "development") {
  sqsConfig.credentials.secretAccessKey = "na";
}

exports.sqs =
  !sqsConfig.endpoint && process.env.NODE_ENV === "development"
    ? null
    : new SQSClient(sqsConfig);

exports.QUEUE_URL =
  process.env.SQS_QUEUE_URL ||
  "http://127.0.0.1:4566/000000000000/photoservice-queue";

exports.sqsConfig = sqsConfig;
