const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url')
const authenticateUser = require('../middleware/authenticateUser');
const checkCredits = require('../middleware/checkCredits');
const { Survey } = require('../models');
const { User } = require('../models');
const Mailer = require('../services/mailer');
const mailTemplate = require('../services/template');

module.exports = app => {

  app.get('/api/surveys', authenticateUser, async (req, res) => {

    const userSurveys = await Survey.find({ _createdBy: req.user.id })

    res.send(userSurveys)
  })

  app.get('/api/surveys/:id/:choice', (req, res) => {
    res.send('<h1>Thank you for your feedback!</h1>');
  });

  app.post('/api/surveys', authenticateUser, checkCredits, async (req, res) => {
    const { title, body, subject, recipients } = req.body;
    const recipientsList = recipients.split(',').map(el => el.trim()).map(el => {
      if (el !== '') {
        return { email: el }
      }
    });

    const newSurvey = await Survey.create({
      title,
      body,
      subject,
      feedback: { yes: 0, no: 0 },
      recipients: recipientsList,
      _createdBy: req.user.id
    });

    const mailer = new Mailer(newSurvey, mailTemplate(newSurvey));

    try {
      await mailer.send();
      await newSurvey.save();
      const foundUser = await User.findById(req.user.id);
      foundUser.credits -= 1;
      await foundUser.save();
      res.send(foundUser);
    } catch (error) {
      res.status(422).json({ error });
    }
  });


  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(req.body)
      .map(({ url, email }) => {
        const match = p.test(new URL(url).pathname)
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice }
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ email, surveyId, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: {
              email: email,
              responded: false
            }
          },
        },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true }
          }).exec()
      })
      .value()
    res.send({})
  })
};
