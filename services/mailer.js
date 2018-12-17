const sendgrid = require('@sendgrid/client');
const helper = require('@sendgrid/helpers').classes;
const mail = require('@sendgrid/mail');
const sengridKey = require('../controllers/config/keys').sendgridKey;

const client = new sendgrid.Client();

class Mailer extends helper.Mail {
  constructor({ subject, recipientsList }, content) {
    super();
    this.from_email = new helper.EmailAddress('no-reply@surway.com');
    this.subject = subject;
    this.body = this.setContent(['text/html', content]);
    this.recipients = this.formatAddresses(recipientsList);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.EmailAddress(email);
    });
  }
  addClickTracking() {
    const trackingSettings = new helper.trackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.setTrackingSettings(trackingSettings);
  }
}
// console.log(helper.Mail);

// module.exports = Mailer;
