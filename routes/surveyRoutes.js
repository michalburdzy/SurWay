const authenticateUser = require('../middleware/authenticateUser');
const checkCredits = require('../middleware/checkCredits');
const { Survey } = require('../models');
// const sgMail = require('@sendgrid/mail');
// const client = require('@sendgrid/client');
// const sengridKey = require('../controllers/config/keys').sendgridKey;
// client.setApiKey(sengridKey);
const { User } = require('../models');
const Mailer = require('../services/mailer');
const mailTemplate = require('../services/template');

module.exports = app => {
  app.post('/api/event', (req, res) => {
    console.log(res.body);
    console.log('YOU CLICKED YES!!');
    res.json('YOU CLICKED YES!!');
  });

  app.get('/api/surveys/feedback', (req, res) => {
    res.send('<h1>Thank you for your feedback!</h1>');
  });

  app.post('/api/surveys', authenticateUser, checkCredits, async (req, res) => {
    const { title, body, subject, recipients } = req.body;
    const recipientsList = recipients.split(',').map(el => el.trim());

    const newSurvey = await Survey.create({
      title,
      body,
      subject,
      recipients: recipientsList,
      _createdBy: req.user.id
    });

    const mailer = new Mailer(newSurvey, mailTemplate(newSurvey));

    try {
      await mailer.send();
      await newSurvey.save();
      // req.user.credits -= 1;
      // const updatedUser = await req.user.save();
      const foundUser = await User.findById(req.user.id);
      foundUser.credits -= 1;
      await foundUser.save();
      res.send(foundUser);
    } catch (error) {
      res.status(422).json({ error });
    }
  });
};
