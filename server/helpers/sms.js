var AWS = require('aws-sdk');

const generateMessage = (type, data) => {
  switch (type) {
    case 'VERIFY_PHONE':
      return `Your Watch Cat verification code is ${data.code}`
    case 'BOOKING_REQUESTED':
      return `You have received a booking request from cat owner ${data.name}`
    case 'BOOKING_ACCEPTED':
      return `Your booking request has been accepted by cat sitter ${data.name}. You can now log into your account to pay for the sitting service.`
    case 'BOOKING_DECLINED':
      return `Your booking request has been declined by cat sitter ${data.name}`
    case 'BOOKING_COMPLETED':
      return `Your booking has marked as completed by cat sitter ${data}. You can now write a review for the his / her service.`
    case 'REVIEW_RECEIEVED':
      return `${data.name} has written a review for you. You can now read the review on your public profile or in the 'Completed' category of your booking records.`
    case 'MESSAGE_RECEIVED':
      return `You have just received a message from ${data.name}`
    default:
      throw new Error("Fail to send sms");
  }
}

const sendSMS = (phone, type, data) => {
  const params = {
    Message: generateMessage(type, data),
    PhoneNumber: '+' + phone,
    MessageAttributes: {
      'AWS.SNS.SMS.SenderID': {
        DataType: 'String',
        StringValue: 'Watch Cat',
      },
    },
  };

  const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' })
    .publish(params)
    .promise();

  publishTextPromise
    .then((data) => {
      return res.end(JSON.stringify({ MessageID: data.MessageId }));
    })
    .catch((err) => {
      return res.end(JSON.stringify({ Error: err }));
    });
};

module.exports = { sendSMS };
