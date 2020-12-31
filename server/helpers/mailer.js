const mailgun = require('mailgun-js');

const { MAILGUN_API_KEY, MAILGUN_API_DOMAIN, CLIENT_URL } = process.env;

const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_API_DOMAIN });

const send = (data) => {
  mg.messages().send(data, (error, body) => {
    if (error) console.log(error)
    console.log(body);
  });
};

const generateEmailTemplate = ({ email, name, content, link, buttonLabel }) => `
  <div style="max-width: 600px; margin:0 auto; font-family: Arial; color: #7F7F7F">
    <br>
    <div style="text-align:center;">
      <a href="https://watchcats.nl" target="_blank">
        <img src="https://drive.google.com/uc?id=1IDHpXVmU1j2KvNI-lO5UD1j7kx50HjoR" alt="watchcats" width="200" height="40"/>
      </a> 
    </div>

    <div style="border-radius: 10px; padding: 30px; font-size: 14px; line-height: 23px;">
      <p>Dear ${name},</p>
      <p>${content}</p>
      <br>
      <div style="text-align:center;">
        <a href=${link} target="_blank" style="padding: 15px 55px; border-radius: 10px; background-color: #FFA195; color: #FFF; text-decoration: none;">
          <b>${buttonLabel}</b>
        </a>
      </div>
      <br>
      <br>
      <span style="margin:0; padding:0;">Cheers,</span>
      <br>
      <span>The Watch Cats Team</span>
    </div>

    <div style="text-align:center; font-size: 11px;">
      <span>This email was sent to </span>
      <span style="text-decoration: none; color: #FFA195;">${email}</span><span>, which is associated with a Watch Cats account.</span>
      </span>
      <br>
      <br>
      <span>© <a href="https://watchcats.nl" target="_blank" style="text-decoration: none; color: #FFA195;">Watch Cats</a> 2020 all rights reserved.</span>
    </div>
  </div>
`

module.exports = {
  sendActivateAccountMail: (email, token) => {
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

  sendResetPasswordMail: ({ email, name, token }) => {
    const content = 'We request a request to reset your password. Please click the link below to complete the reset. If you did not request to reset your password, ignore this email and the link will expire on its own.'
    const link = `https://${CLIENT_URL}/reset_password/${token}`;
    const buttonLabel = 'SET NEW PASSWORD'
    const html = generateEmailTemplate({ email, name, content, link, buttonLabel });

    const data = {
      from: 'noreply@watchcats.com',
      to: email,
      subject: 'Reset your Watch Cats account password',
      html,
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
    console.log({ data })

    // SEND EMAIL -------
    // send(data);
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
