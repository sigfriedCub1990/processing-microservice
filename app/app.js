const path = require("path");
const resizeImageProcess = require("./processes/resize-image");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const JOBS_QUEUE_NAME = "resizing-jobs";
const Queue = require("bull");

// Pass Jobs' queue reference to add jobs
const sqsConsumerFactory = require("./sqs-consumer");

const jobsQueue = new Queue(JOBS_QUEUE_NAME);
const sqsConsumer = sqsConsumerFactory(jobsQueue);

jobsQueue.process(resizeImageProcess);
sqsConsumer.start();
