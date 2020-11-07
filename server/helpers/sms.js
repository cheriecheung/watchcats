const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

const twilio = require('twilio');
const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const generateMessage = (type, data) => {
  switch (type) {
    case 'VERIFY_PHONE_NUMBER':
      return `Your Watch Cat verification code is ${data.code}`
    case 'BOOKING_REQUESTED':
      return `You have received a booking request from cat owner ${data.name}. You can now log into your account to accept or decline the request.`
    case 'BOOKING_ACCEPTED':
      return `Your booking request has been accepted by cat sitter ${data.name}. You can now log into your account to pay for the sitting service.`
    case 'BOOKING_DECLINED':
      return `Your booking request has been declined by cat sitter ${data.name}. The booking status has been updated accordingly.`
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

module.exports = {
  sendTwilioSMS: (phone, type, data) => {
    const body = generateMessage(type, data)

    console.log({
      body,
      to: `+${phone}`
    })

    // client.messages.create({
    //   body,
    //   to: `+${phone}`,  // Text this number
    //   from: '+18332774431' // From a valid Twilio number
    // })
    //   .then((message) => console.log({ message: message.sid }))
    //   .catch(err => console.log({ err }))
  }
};
