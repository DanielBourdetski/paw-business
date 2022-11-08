const express = require('express');
const { auth } = require('../middleware/auth');
const { Product } = require('../models/products');
const { User } = require('../models/users');

const router = express.Router();

router.post('/pay-for-cart', auth, async (req, res) => {
  const { cart } = req.user;
  const { cardDetails } = req.body;

  if (!cart?.length) return res.status(400).send('cart is empty, this need to be validated in client');

  // validate card and pay for cart items;

  res.send('Payment complete');
})

router.post('/pay-for-cart', auth, (req, res) => {
  const { itemId, cardDetails } = req.body;

  const item = Product.find({_id: itemId});
  if (!item) return res.status(404).send('no matching item found');
})

module.exports = router;