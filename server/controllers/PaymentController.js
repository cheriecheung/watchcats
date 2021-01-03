const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../model/User');

function generateAccountLink(accountID, origin) {
  return stripe.accountLinks
    .create({
      type: 'account_onboarding',
      account: accountID,
      refresh_url: `${origin}/onboard-user/refresh`,
      return_url: `${origin}/account`,
    })
    .then((link) => link.url);
}

module.exports = {
  onboardUser: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    try {
      const user = await User.findById(userId)
      if (!user) return res.status(404).json('ERROR/USER_NOT_FOUND');

      const { email, firstName, lastName, urlId } = user;

      const account = await stripe.accounts.create({
        business_profile: {
          // name: null,
          // email,
          product_description: 'Pet sitting',
          url: `https://watchcats.nl/profile/catsitter/${urlId}`,
        },
        business_type: 'individual',
        individual: {
          first_name: firstName,
          last_name: lastName,
          email,
        },
        country: 'NL',
        default_currency: 'eur',
        type: 'standard',
      });

      user.stripeAccountId = account.id
      await user.save();

      // const origin = `${req.headers.origin}`;
      const origin = `https://localhost:3000`;
      const accountLink = await generateAccountLink(account.id, origin);
      return res.status(200).json({ accountLink });
    } catch (err) {
      return res.status(500).send({ err });
    }
  },

  onboardRefresh: async (req, res) => {
    if (!req.session.accountID) return res.redirect('/');

    try {
      const { accountID } = req.session;
      // const origin = `${req.secure ? 'https://' : 'https://'}${req.headers.host}`;
      const origin = `https://${req.headers.host}`;
      const accountLink = await generateAccountLink(accountID, origin);
      return res.redirect(accountLink);
    } catch (err) {
      return res.status(400).send({ err });
    }
  },

  getClientSecret: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    const { bookingId } = req.body;

    try {
      const user = await User.findById(userId)
      if (!user) return res.status(404).json('ERROR/USER_NOT_FOUND');

      const { stripeAccountId } = user;

      const intent = await stripe.paymentIntents.create(
        {
          // amount that user pays
          amount: 2400,
          // amount from above that goes to Watch Cats platform
          application_fee_amount: 7,
          currency: 'eur',
          payment_method_types: ['ideal'],
        },
        { stripeAccount: stripeAccountId }
      );

      const client_secret = intent.client_secret;

      return res.status(200).json({ client_secret, stripeAccountId: 'acct_1HYCiyART4JEToPd' });
    } catch (e) {
      console.log({ e });
      return res.status(401).json('ERROR/ERROR_OCCURED');
    }
  },
};
