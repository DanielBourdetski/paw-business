import joi from 'joi';

const passwordRegex = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const fullNameRegex = /^[a-z ,.'-]+$/i

export const validateLogin = user => {
  const schema = joi.object({
    email: joi.string().min(6).max(50).pattern(emailRegex).required().messages({
      'string.pattern.base': 'Invalid email address'
    }),
    password: joi.string().min(8).max(1024).pattern(passwordRegex).required().messages({
      'string.pattern.base': 'Password should be 8 letters long with on the following: An upper case letter, a lower case letter, a digit and a special'
    }),  })
    
  return schema.validate(user, { abortEarly: false });
}

export const validateSignup = user => {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required().messages({
      'string.min': 'Name should be at least 3 letters long',
      'string.max': 'Name Should not be more than 50 letters long'
    }),
    email: joi.string().min(6).max(50).pattern(emailRegex).required().messages({
      'string.pattern.base': 'Invalid email address'
    }),
    password: joi.string().min(8).max(1024).pattern(passwordRegex).required().messages({
      'string.pattern.base': 'Password should be 8 letters long with on the following: An upper case letter, a lower case letter, a digit and a special'
    }),
  })

  return schema.validate(user, { abortEarly: false });
}

export const validateUserUpdate = user => {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().min(6).max(50).pattern(emailRegex).required().messages({
      'string.pattern.base': 'Invalid email address'
    }),
  })

  return schema.validate(user, { abortEarly: false });
}

export const validatePassword = password => {
  const schema = joi.object({
    password: joi.string().min(8).max(1024).pattern(passwordRegex).required().messages({
      'string.pattern.base': 'Password should be 8 letters long with on the following: An upper case letter, a lower case letter, a digit and a special'
    }),  })

  return schema.validate({password})
}

export const validateEmail = email => {
  const schema = joi.object({
    email: joi.string().min(6).max(50).pattern(emailRegex).required().messages({
      'string.pattern.base': 'Invalid email address'
    }),
  })
  
  return schema.validate({ email });
}

export const validateFullName = name => {
  const schema = joi.object({
    name: joi.string().pattern(/^([\p{L}]{3,})+\s+([\p{L}\s]{3,})+$/iu).required().messages({
      'string.pattern.base': 'Invalid name. Full name is required'
    })
  });

  return schema.validate({ name });
};