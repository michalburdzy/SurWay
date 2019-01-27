export default emails => {
  const wrongEmails = emails
    .replace(/,\s*$/, '')
    .split(',')
    .map(email => email.trim())
    .filter(email => {
      const exp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return exp.test(email) === false;
    });
  if (wrongEmails.length) {
    return `Found invalid emails: ${wrongEmails}`;
  }
  return null;
};
