const joi = require('joi');
const mongoose = require('mongoose');

const { allowedAnimals } = require('../config/config');
const validateAnimal = (animal) => {
  return allowedAnimals.includes(animal)
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  _sold: {
    type: Number,
    default: 0
  },
  tags: {
    type: Array,
    required: true,
    default: []
  },
  animal: {
    type: String,
    required: true,
    validate: [validateAnimal, 'Provided animal not on animal list']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Product = mongoose.model('Product', productSchema);

const validateProduct = product => {
  const schema = joi.object({
    name: joi.string().min(2).max(30).required(),
    description: joi.string().min(5).max(50).required(),
    price: joi.number().required(),
    image: joi.string().required(),
    _sold: joi.number().default(0),
    tags: joi.array().default([]),
    animal: joi.string().custom((val, helper) => (validateAnimal(val) || helper.message('Provided animal not on animal list'))),
  })

  return schema.validate(product);
}

module.exports = {
  productSchema,
  Product,
  validateProduct
}