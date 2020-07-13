const mailgun = require('mailgun-js');
const DOMAIN = process.env.MAILGUN_API_DOMAIN;

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: DOMAIN,
});

const sendMail = (to, token) => {
  const data = {
    from: 'noreply@purryful.com',
    to,
    subject: 'Please verify your email',
    html: `
      <p>Hi there!</p>
      <p>Please click on the following link to activate your account:</p>
      <a href="${process.env.CLIENT_URL}/activate">${process.env.CLIENT_URL}/activate/${token}</a>
    `,
  };

  mg.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
};

module.exports = sendMail;
