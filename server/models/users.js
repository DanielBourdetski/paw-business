const joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { jwtKey } = require('../config/config');
const { emailRegex, passwordRegex } = require('../helpers/regex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 50,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: [{ product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, amount: Number }],
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = (_id) => {
  const token = jwt.sign({ _id}, jwtKey);
  return token;
}

const User = mongoose.model('User', userSchema);

const validateUser = user => {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().min(6).max(50).pattern(emailRegex).required(),
    password: joi.string().min(8).max(1024).pattern(passwordRegex).required(),
  })

  return schema.validate(user);
}

const validateUserUpdate = user => {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().min(6).max(50).pattern(emailRegex).required(),
  })

  return schema.validate(user);
}

const validatePassword = password => {
  const schema = joi.object({
    password: joi.string().min(8).max(1024).pattern(passwordRegex).required(),
  })

  return schema.validate(password)
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateUserUpdate = validateUserUpdate;
exports.validatePassword = validatePassword;