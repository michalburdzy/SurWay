const authenticateUser = require('../middleware/authenticateUser');
const checkCredits = require('../middleware/checkCredits');
const { Survey } = require('../models');
const sgMail = require('@sendgrid/mail');
const client = require('@sendgrid/client');
const sengridKey = require('../controllers/config/keys').sendgridKey;
client.setApiKey(sengridKey);
const { User } = require('../models');

module.exports = app => {
  app.post('/api/surveys/webhooks', (req, res) => {
    console.log(res.body);
    console.log('YOU CLICKED YES!!');
    res.json('YOU CLICKED YES!!');
  });

  app.post(
    '/api/surveys',
    //  authenticateUser,
    //   checkCredits,
    async (req, res) => {
      const { title, body, subject, recipients } = req.body;
      const userId = Math.round(Math.random() * 10000000000);
      const recipientsList = recipients
        .split(',')
        .map(email => ({ email: email.trim() }));

      const newSurwey = await Survey.create({
        title,
        body,
        subject,
        recipientsList,
        _createdBy: req.user.id
      });

      const mailer = new Mailer(newSurvey, template);

      // sgMail.setApiKey(sgKey);
      // let sendTo = [];
      // recipientsList.map(item => sendTo.push(item.email));
      // const msg = {
      //   to: sendTo,
      //   from: 'test@example.com',
      //   subject,
      //   text: body,
      //   html:
      //     '<div><h1><a href="localhost:5000/api/surveys/webhooks">Click to answer YES</a></h1></div>'
      // };
      // sgMail
      //   .sendMultiple(msg)
      //   .then(async () => {
      //     const currentUser = await User.findById(req.user.id);
      //     currentUser.credits -= 1;
      //     const savedUser = await currentUser.save();
      //     res.json({
      //       message: 'POSTED A SURVEY'
      //     });
      //   })
      //   .catch(err => {
      //     res.json({
      //       message: 'ERROR',
      //       err
      //     });
      //   });
    }
  );
};
