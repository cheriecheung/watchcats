const mailgun = require('mailgun-js');
const DOMAIN = process.env.MAILGUN_API_DOMAIN;

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: DOMAIN,
});

const send = (data) => {
  mg.messages().send(data, (error, body) => {
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
};

const sendActivateMail = (to, token) => {
  const link = `https://${process.env.CLIENT_URL}/activate/${token}`;

  const data = {
    from: 'noreply@watchcats.com',
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

  send(data);
};

const sendResetPwMail = (to, token) => {
  const link = `https://${process.env.CLIENT_URL}/resetpassword/${token}`;

  const data = {
    from: 'noreply@watchcats.com',
    to,
    subject: 'Reset password',
    html: `
      <html>
        <h3>Hi there!</h3>
        <p>Please click on the following link to reset your password:</p>
        <a href="${link}">${link}</a>
      </html>
    `,
  };

  send(data);
};

module.exports = { sendActivateMail, sendResetPwMail };
