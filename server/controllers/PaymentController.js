const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../model/User');

function generateAccountLink(accountID, origin) {
  return stripe.accountLinks
    .create({
      type: 'account_onboarding',
      account: accountID,
      refresh_url: `${origin}/onboard-user/refresh`,
      return_url: `${origin}/about`,
    })
    .then((link) => link.url);
}

module.exports = {
  onboardUser: async (req, res) => {
    try {
      const userId = req.headers['authorization'];

      const userRecord = await User.findById(userId);

      const account = await stripe.accounts.create({ type: 'standard' });
      // req.session.accountID = account.id;
      userRecord.stripeAccountId = account.id;

      // const origin = `${req.headers.origin}`;
      const origin = `https://localhost:3000`;
      const accountLinkURL = await generateAccountLink(account.id, origin);
      return res.status(200).json({ url: accountLinkURL });
    } catch (err) {
      res.status(500).send({
        error: err.message,
      });
    }
  },

  onboardRefresh: async (req, res) => {
    if (!req.session.accountID) {
      res.redirect('/');
      return;
    }
    try {
      const { accountID } = req.session;
      const origin = `${req.secure ? 'https://' : 'https://'}${req.headers.host}`;

      const accountLinkURL = await generateAccountLink(accountID, origin);
      res.redirect(accountLinkURL);
    } catch (err) {
      res.status(500).send({
        error: err.message,
      });
    }
  },

  getClientSecret: async (req, res) => {
    try {
      const userId = req.headers['authorization'];
      const { bookingId } = req.body;

      console.log({ userId, bookingId: req.body });

      const intent = await stripe.paymentIntents.create({
        amount: 23,
        currency: 'eur',
        payment_method_types: ['ideal'],
        confirm: true,
        return_url: 'https://localhost:3000/test',
      });

      const client_secret = intent.client_secret;

      return res.status(200).json({ client_secret });
    } catch (e) {
      console.log({ e });
      return res.status(401).json('Unsuccessful');
    }
  },
};
