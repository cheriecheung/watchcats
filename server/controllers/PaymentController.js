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
    const { userId } = req.verifiedData
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    try {
      const account = await stripe.accounts.create({
        business_profile: {
          // mcc: null,
          // name: null,
          product_description: 'Pet sitting',
          // support_address: null,
          // support_email: null,
          // support_phone: null,
          url: 'https://www.testURL.com/profile/catsitter/test_id_5X235934s',
        },
        business_type: 'individual',
        individual: {
          first_name: 'test first name',
          last_name: 'test last name',
          email: 'test@email.com',
        },
        country: 'NL',
        default_currency: 'eur',
        type: 'standard',
      });

      const userRecord = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { stripeAccountId: account.id } },
        { useFindAndModify: false }
      );
      if (!userRecord) return res.status(404).json('ERROR/ERROR_OCCURED');

      // const origin = `${req.headers.origin}`;
      const origin = `https://localhost:3000`;
      const accountLink = await generateAccountLink(account.id, origin);
      return res.status(200).json({ url: accountLink });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },

  onboardRefresh: async (req, res) => {
    if (!req.session.accountID) return res.redirect('/');

    try {
      const { accountID } = req.session;
      const origin = `${req.secure ? 'https://' : 'https://'}${req.headers.host}`;
      const accountLink = await generateAccountLink(accountID, origin);
      return res.redirect(accountLink);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },

  getClientSecret: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    try {
      const { bookingId } = req.body;

      console.log({ userId, bookingId });

      const intent = await stripe.paymentIntents.create(
        {
          // amount that user pays
          amount: 2400,
          // amount from above that goes to WatchCats platform
          application_fee_amount: 7,
          currency: 'eur',
          payment_method_types: ['ideal'],
        },
        {
          // connected stripe account Id
          stripeAccount: 'acct_1HYCiyART4JEToPd',
        }
      );

      const client_secret = intent.client_secret;

      return res.status(200).json({ client_secret, stripeAccountId: 'acct_1HYCiyART4JEToPd' });
    } catch (e) {
      console.log({ e });
      return res.status(401).json('ERROR/ERROR_OCCURED');
    }
  },
};
