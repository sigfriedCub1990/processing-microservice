const { Consumer } = require("sqs-consumer");
const { QUEUE_URL, sqs } = require("./sqs");

function consumerFactory(jobsQueue) {
  const sqsConsumer = Consumer.create({
    queueUrl: QUEUE_URL,
    handleMessage: async (message) => {
      try {
        const messageBody = JSON.parse(message.Body);
        await jobsQueue.add({
          ...messageBody,
        });
      } catch (error) {
        console.error("Something went wrong");
        console.log(error.message);
      }
    },
    sqs,
  });

  sqsConsumer.on("error", (err) => {
    // TODO: Use winston for this
    console.log("Error");
    console.error(err);
  });

  sqsConsumer.on("processing_error", (err) => {
    console.log("Error processing message from queue");
    console.error(err);
  });

  return sqsConsumer;
}

module.exports = consumerFactory;
