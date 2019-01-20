const {emailDomain} = require('../controllers/config/keys');

module.exports = ({id, body, title, subject}) => {
  return `
    <html>
      <body>
        <div style='text-align: center'>
          <h2>${title}</h2>
          <h3>${subject}</h3>
          <p>${body}</p>
          <div>
          <a href="${emailDomain}/api/surveys/${id}/yes">Yes</a>
          <a href="${emailDomain}/api/surveys/${id}/no">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
