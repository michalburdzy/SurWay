const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  googleID: String,
  credits: {
    type: Number,
    default: 0,
  },
  // picture: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
