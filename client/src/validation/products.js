import joi from 'joi';

export const validateProduct = product => {
  const schema = joi.object({
    name: joi.string().min(2).max(50).required(),
    description: joi.string().min(5).max(120).required(),
    price: joi.number().required(),
    image: joi.string().required(),
    tags: joi.array().default([]),
    animal: joi.string().optional()
    })

  return schema.validate(product, { abortEarly: false });
}