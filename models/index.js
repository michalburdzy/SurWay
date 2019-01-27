const mongoose = require('mongoose');
const { mongoURI } = require('../controllers/config/keys');

mongoose.connection.on('open', () => {
  console.log('Connected to mongo server.');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true }
);

module.exports.User = require('./user');
module.exports.Survey = require('./survey');
