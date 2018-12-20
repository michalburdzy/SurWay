const sg = require('@sendgrid/mail');
const sendgridKey = require('../controllers/config/keys').sendgridKey;

class Mailer {
  constructor({ subject, recipients }, content) {
    this.message = {
      to: recipients,
      from: 'no-reply@emaily.com',
      subject: subject,
      html: content,
      trackingSettings: {
        clickTracking: { enable: true }
      }
    };
    sg.setApiKey(sendgridKey);
  }

  async send() {
    const response = await sg.sendMultiple(this.message);
    return response;
  }
}

module.exports = Mailer;
