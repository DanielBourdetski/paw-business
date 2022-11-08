import joi from 'joi';

const passwordRegex = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const validateLogin = user => {
  const schema = joi.object({
    email: joi.string().min(6).max(50).pattern(emailRegex).required(),
    password: joi.string().min(8).max(1024).pattern(passwordRegex).required(),
  })

  return schema.validate(user);
}

export const validateSignup = user => {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().min(6).max(50).pattern(emailRegex).required(),
    password: joi.string().min(8).max(1024).pattern(passwordRegex).required(),
  })

  return schema.validate(user);
}

export const validateUserUpdate = user => {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().min(6).max(50).pattern(emailRegex).required(),
  })

  return schema.validate(user);
}

export const validatePassword = password => {
  const schema = joi.object({
    password: joi.string().min(8).max(1024).pattern(passwordRegex).required(),
  })

  return schema.validate(password)
}