const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
     auth: {
          user: 'pawbusinessproject@gmail.com',
          pass: 'bswhzzbiagbvnpse',
       },
  secure: true,
  });

  const sendTextEmail = (message) => {
    transporter.sendMail(message, err => {
      if (err) return err;
    })
  }

module.exports = sendTextEmail;