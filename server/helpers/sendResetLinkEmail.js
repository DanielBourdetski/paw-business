const sendTextEmail = require('../email/email');

const sendResetLink = (to, token) => {
  const message = {
    from: 'support@PawBusiness.com',
    to,
    subject: 'Your password reset link',
    text: `Here is your reset link: http://localhost:3000/forgot-password/${token} - please notice it expires after 24 hours`
  }

  sendTextEmail(message);
};

const sendDemoResetLink = (to) => {
  const message = {
    from: 'dev@PawBusiness.com',
    to,
    subject: 'Paw Business - not a SPAM',
    text: 'It seems you are not registered - here is a registration link: http://localhost:3000/registration'
  }

  sendTextEmail(message)
}

module.exports = {
  sendResetLink,
  sendDemoResetLink,
}
