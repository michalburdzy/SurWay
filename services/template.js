module.exports = survey => {
  return `
    <html>
      <body>
        <div style='text-align: center'>
          <h3>SurWay survey!</h3>
          <p>Select one option please</p>
          <p>${survey.body}</p>
          <div>
          <a href='http://localhost:3000'>Yes</a>
          <a href='http://localhost:3000'>No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
