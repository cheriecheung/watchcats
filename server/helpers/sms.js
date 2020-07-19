var AWS = require('aws-sdk');

const sendSMS = (phone, code) => {
  const params = {
    Message: `Your Watch Cat verification code is ${code}`,
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
