const express = require('express');
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./models');
const { clientID, clientSecret } = require('./controllers/config/keys');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use(
  cookieSession({
    keys: ['asddsaasddsa'],
    maxAge: 60 * 60 * 1000
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  db.User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await db.User.findOne({ googleID: profile.id });
      if (!user) {
        const newUser = await db.User.create({
          googleID: profile.id,
          name: profile.displayName
          // picture: profile.photos[0].value,
        });
        done(null, newUser);
      } else {
        done(null, user);
      }
    }
  )
);

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
