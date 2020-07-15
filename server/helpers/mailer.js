const mailgun = require('mailgun-js');
const DOMAIN = process.env.MAILGUN_API_DOMAIN;

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: DOMAIN,
});

const sendMail = (to, token) => {
  const link = `http://${process.env.CLIENT_URL}/activate/${token}`;

  const data = {
    from: 'noreply@purryful.com',
    to,
    subject: 'Please verify your email',
    html: `
      <html>
        <h3>Hi there!</h3>
        <p>Please click on the following link to activate your account:</p>
        <a href="${link}">${link}</a>
      </html>
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
