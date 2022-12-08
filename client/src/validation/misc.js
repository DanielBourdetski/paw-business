import joi from 'joi';

export const validateFullName = name => {
  const schema = joi.object({
    name: joi.string().pattern(/^([\p{L}]{3,})+\s+([\p{L}\s]{3,})+$/iu).required().messages({
      'string.pattern.base': 'Invalid name. Full name is required'
    })
  });

  return schema.validate({ name });
};