const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/users');

const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  let user = await User.findOne({ email: { '$regex': req.body.email, $options: 'i' } });
  if (!user) return res.status(400).send('Invalid credentials');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid credentials');

  const { name, email, cart, favourites } = user;

  res.json({ token: user.generateAuthToken(user._id), name, email, cart, favourites});
})

const validateUser = req => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(8).max(1024).required(),
  })

  return schema.validate(req);
}

module.exports = router;