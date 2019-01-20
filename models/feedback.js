const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = Schema({
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0}
});

module.exports = feedbackSchema;
