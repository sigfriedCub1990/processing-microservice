const { SendMessageCommand } = require("@aws-sdk/client-sqs");

function makeSendMessage({ sqsClient }) {
  return async ({ message }) => {
    const sendMessageCommand = new SendMessageCommand({
      QueueUrl: "000000000000/photoservice-completed-queue",
      MessageBody: message,
    });
    await sqsClient.send(sendMessageCommand);
  };
}

module.exports = makeSendMessage;
