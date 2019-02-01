module.exports = {
  mongoURI: process.env.MONGO_URI,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendgridKey: process.env.SENDGRID_KEY,
  emailDomain: process.env.EMAIL_DOMAIN,
  testUserId: process.env.TEST_USER_ID,
  redisKey: process.env.REDIS_KEY
};
