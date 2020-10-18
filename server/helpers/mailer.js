const mailgun = require('mailgun-js');

const { MAILGUN_API_KEY, MAILGUN_API_DOMAIN, CLIENT_URL } = process.env;

const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_API_DOMAIN });

const send = (data) => {
  mg.messages().send(data, (error, body) => {
    if (error) console.log(error)
    console.log(body);
  });
};

module.exports = {
  sendActivateMail: (userEmail, token) => {
    const link = `https://${CLIENT_URL}/activate/${token}`;

    const data = {
      from: 'noreply@watchcats.com',
      to: userEmail,
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
  },

  sendResetPwMail: (userEmail, token) => {
    const link = `https://${CLIENT_URL}/reset_password/${token}`;

    const data = {
      from: 'noreply@watchcats.com',
      to: userEmail,
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
  }
};
