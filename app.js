const express = require('express');
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./models');
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
      clientID:
        '946065475020-q7obeobej1nprj7b0r8av8b78spf8hvq.apps.googleusercontent.com',

      clientSecret: '1Y9MnDjdXjFUhsWh97KL_U74',
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

// testing the sendgrid
app.post('/api/event', function(req, res) {
  var events = req.body;
  events.forEach(function(event) {
    // Here, you now have each event and can process them how you like
    console.log(event);
  });
});

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
