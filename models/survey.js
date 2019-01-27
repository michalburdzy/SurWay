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
      type: [recipientSchema],
      required: true
    },
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
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
