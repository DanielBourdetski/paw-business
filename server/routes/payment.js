const express = require('express');
const { auth } = require('../middleware/auth');
const { Product } = require('../models/products');

const router = express.Router();

router.post('/pay-for-cart', auth, async (req, res) => {
  try {
    const { user } = req;
    const { paymentInfo } = req.body;

    if (!user.cart?.length) return res.status(400).send('cart is empty, this need to be validated in client');

    // banking validation and clearance

    const ids = user.cart.map(p => p.product);
    const products = await Product.find({ '_id': { $in: ids } });
    products.forEach(product => {
      const { amount: amountJustSold } = user.cart.find(p => p.product.toString() === product._id.toString());
      product._sold += amountJustSold;
      product.save();
    });

    user.cart = [];
    await user.save();
    res.send('Payment complete');
  } catch (err) {
    res.status(500).send('An unexpected error has occured while trying to complete purchase: ' + err.message);
  }

})

module.exports = router;