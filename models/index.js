const mongoose = require('mongoose');
const { mongoURI } = require('../controllers/config/keys');

mongoose.connection.on('open', () => {
  console.log('Connected to mongo server.');
});

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true },
);

module.exports.User = require('./user');
