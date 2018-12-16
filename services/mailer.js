const sendgrid = require('@sendgrid/client');
const helper = require('@sendgrid/mail');
const sengridKey = require('../controllers/config/keys').sendgridKey;
console.log(helper.MailService);

const client = new sendgrid.Client();
console.log(client);

const mailService = new helper.MailService();
console.log(mailService);

class Mailer {
  constructor() {
    // super();
  }
}

module.exports = Mailer;
