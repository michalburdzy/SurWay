const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = Schema({
  email: {
    type: String,
    required: true
  },
  option1: {
    question: String,
    answer: {}
  },
  option2: {
    question: String,
    answer: {}
  }
});

module.exports = feedbackSchema;
