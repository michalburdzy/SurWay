const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipientSchema = require('./recipient');
const feedbackSchema = require('./feedback');
const Mailer = require('../services/mailer.js');

const surveySchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    recipients: {
      type: [String],
      required: true
    },
    feedback: {
      type: [feedbackSchema]
    },
    _createdBy: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Survey = mongoose.model('survey', surveySchema);

module.exports = Survey;
