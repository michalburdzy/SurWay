const keys = require('../controllers/config/keys');

module.exports = survey => {
  return `
    <html>
      <body>
        <div style='text-align: center'>
          <h3>SurWay survey!</h3>
          <p>Select one option please</p>
          <p>${survey.body}</p>
          <div>
          <a href="${keys.emailDomain}/api/surveys/feedback">Yes</a>
          <a href="${keys.emailDomain}/api/surveys/feedback">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
