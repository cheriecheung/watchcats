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
  sendActivateMail: (email, token) => {
    // query string activate?token=${token} ??
    const link = `https://${CLIENT_URL}/activate/${token}`;

    const data = {
      from: 'noreply@watchcats.com',
      to: email,
      subject: 'Please verify your email',
      html: `
      <html>
        <h3>Hi there!</h3>
        <p>Please click on the following link to activate your account:</p>
        <a href="${link}" style="background:pink;">Confirm my email</a>
      </html>
    `,
    };

    send(data);
  },

  sendResetPwMail: (email, token) => {
    const link = `https://${CLIENT_URL}/reset_password/${token}`;

    const data = {
      from: 'noreply@watchcats.com',
      to: email,
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
  },

  sendNewBookingMail: ({ email, name }) => {
    const data = {
      from: 'noreply@watchcats.com',
      to: email,
      subject: 'You have a new booking request',
      html: `
      <html>
        <h3>Hi there!</h3>
        <p>You have received a booking request from ${name}. You can now log into your account to accept or decline the request.</p>
      </html>
    `,
    };

    send(data);
  },

  sendUpdatedBookingMail: ({ email, action, name }) => {
    const data = {
      from: 'noreply@watchcats.com',
      to: email,
      subject: 'You have a new booking request',
      html: `
      <html>
        <h3>Hi there!</h3>
        <p>Your booking has been updated as ${action} by ${name}. The booking status is changed accordingly.</p>
      </html>
    `,
    };

    send(data);
  },


  sendNewMessageMail: ({ email, name }) => {
    const data = {
      from: 'noreply@watchcats.com',
      to: email,
      subject: 'You have a new message',
      html: `
      <html>
        <h3>Hi there!</h3>
        <p>You have received a new message by ${name}. Log into your account to reply in your conversation.</p>
      </html>
    `,
    };

    send(data);
  },

  sendNewReviewMail: ({ email, name }) => {
    const data = {
      from: 'noreply@watchcats.com',
      to: email,
      subject: 'You have a new message',
      html: `
      <html>
        <h3>Hi there!</h3>
        <p>You have received a review by ${name}. Log into your account to check the review.</p>
      </html>
    `,
    };

    send(data);
  }
};
