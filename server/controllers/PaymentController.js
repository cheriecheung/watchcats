const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const uuid = require('uuid/v4');

module.exports = {
  getClientSecret: async (req, res) => {
    try {
      const userId = req.headers['authorization'];
      const { bookingId } = req.body;

      console.log({ userId, bookingId: req.body });

      const intent = await stripe.paymentIntents.create({
        amount: 23,
        currency: 'eur',
        payment_method_types: ['ideal'],
      });

      const client_secret = intent.client_secret;

      return res.status(200).json({ client_secret });
    } catch (e) {
      console.log({ e });
      return res.status(401).json('Unsuccessful');
    }
  },
};
