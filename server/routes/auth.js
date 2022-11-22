const express = require('express');
const mongoose = require('mongoose')
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User, validatePassword } = require('../models/users');
const { ResetToken } = require('../models/resetTokens');
const { sendDemoResetLink, sendResetLink } = require('../helpers/sendResetLinkEmail');

const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: { '$regex': req.body.email, $options: 'i' } });
  if (!user) return res.status(400).send('Invalid credentials');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid credentials');

  const { name, email, cart, favorites, isAdmin } = user;

  res.json({ token: user.generateAuthToken(user._id), name, email, cart, favorites, isAdmin});
})

router.post('/request-password-reset-link', async (req, res) => {
  const email = req.body.email;
  
  try {
    // ! NOTICE - for the purposes of this demo application, an email will be send to every email provided as a proof of concept,
    // !          but a rest link will be attached only for registered users.
    const user = await User.findOne({ email: { '$regex': email, $options: 'i' }});
    // ? vvv   this line should be uncommented on a real server   vvv
    // if (!user) return res.status(404).send('No user with matching email found');

    if (user) {
      await ResetToken.findOneAndDelete({userId: user._id});
      const createToken = () => (new mongoose.Types.ObjectId()).toString();
      
      const resetToken = new ResetToken({
        userId: user._id,
        token: createToken(),
      }); 

      sendResetLink(email, resetToken.token);
      
      await resetToken.save();
      return res.send('ok');
    };

    sendDemoResetLink(email);
    res.send(`Email with link sent to ${email}`)

  } catch (err) {
    res.status(500).send('Unexpected error: ' + err.message);
}
});

router.get('/confirm-reset-token/:token', async (req, res) => {
  const token = req.params.token;

  try {
    const resetToken = await ResetToken.findOne({ token });
    if (!resetToken) return res.status(404).send('Reset link invalid or expired');

    res.send(true);
  } catch (err) {
    res.status(500).send('Unexpected error: ' + err.message);
  }
});

router.patch('/password', async (req, res) => {
  const { password: newPassword, token } = req.body;

  const { error } = validatePassword(newPassword);
  if (error) return res.status(400).send('Password does not answer the requirements: 8 letters and at least one of each: lower case letter, upper case letter, number, special sign')

  try {
    const fullResetToken = await ResetToken.findOne({ token });
    if (!fullResetToken) return res.status(404).send('Reset link is invalid or has expired');

    const user = await User.findById(fullResetToken.userId);
    if (!user) return res.status(500).send('Unexpected server error. Please request another reset link');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save()

    await fullResetToken.remove();

    res.send('User password has been reset');
  } catch (err) {
    res.status(500).send('An unexpected error has occured:', err.message);
  }
})

const validateUser = req => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(8).max(1024).required(),
  })

  return schema.validate(req);
}

module.exports = router;