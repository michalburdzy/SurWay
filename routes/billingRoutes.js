const { stripeSecretKey } = require('../controllers/config/keys');
const stripe = require('stripe')(stripeSecretKey);
const { User } = require('../models');
const authenticateUser = require('../middleware/authenticateUser');

module.exports = app => {
  app.post('/api/stripe', authenticateUser, async (req, res) => {
    await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: req.body.id, // obtained with Stripe.js
      description: `Charge for ${req.body.email} with ${
        req.body.card.brand
      } card ending with ${req.body.card.last4} and email ${
        req.body.card.name
      }.`
    });
    const currentUser = await User.findById(req.user._id);
    currentUser.credits += 5;
    const savedUser = await currentUser.save();
    res.send(savedUser);
  });
};
