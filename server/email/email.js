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

// const message = {
//   from: "PawBusinessSupport@gmail.com",
//   to: "Daniel.Bourdetski@gmail.com",
//   subject: "Password reset link",
//   text: "This is your..."
// };

// transporter.sendMail(message, (err, info) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(info);
//   }
// })

module.exports = sendTextEmail;