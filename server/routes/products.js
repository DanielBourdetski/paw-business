const express = require('express');
const router = express.Router();

const _ = require('lodash');

const { Product, validateProduct } = require('../models/products');
const { auth, authAdmin } = require('../middleware/auth');
const { allowedAnimals } = require('../config/config');

const handleErrors = (err, res) => {
  if (err.name === 'CastError') return res.status(406).send('Invlaid product ID')

  res.status(500).send(err.message);
}

router.get('/', auth, async (_, res) => {
  try {
    const allProducts = await Product.find();
    res.send(allProducts);
  } catch (err) {
    handleErrors(err, res)
  }
});

router.get('/popular', auth, async (_, res) => {
  
  const popularTags = ['cat', 'dog']
  
  try {
    
    // searches for each of the tags individually, each query returns an object with the tag as a property.
    const getProductsByTagPromise = (tag) => {
      return new Promise(async (resolve, reject) => {
        const products = await Product.find({ tags: tag });
        resolve({ [tag]: products });
      })
    }

    const flattenArrayOfObjects = data => {
      let object = {};
      data.forEach(d => object = {...object, ...d})
      return object;
    }
    
    const promises = [];
    popularTags.forEach(t => {
      promises.push(getProductsByTagPromise(t));
    })
    
    // after both querries finish through Promise.all(), flatten the resulting objects to be send as response
    const productPromise = Promise.all(promises);

    productPromise.then(arrayOfProductsByTag => {
      const products = flattenArrayOfObjects(arrayOfProductsByTag)
      res.send(products)
    })
  } catch (err) {
    handleErrors(err, res);
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, description, price, image, tags, animal } = req.body;

    let product = await Product.findOne({ name: name })
    if (product) return res.status(400).send('Product name already exists');

    product = new Product({
      name, description, price, image, tags, animal
    });

    post = await product.save();
    res.send(product);
  } catch (err) {
    handleErrors(err, res)
  }
});

router.get('/tag/:tag', auth, async (req, res) => {
  const tag = req.params.tag;
  if (!tag) return res.status(400).send('No tag provided');
  
  try {
    const regex = new RegExp(tag, 'i');  // make search case-insensitve
    const products = await Product.find({tags: { $regex: regex}});

    if (!products) res.status(400).send('Seems we couldnt find what you searched for');

    res.json(products);
  } catch (err) {
    res.status(500).send('an unexpected error has occured: ' + err);
  }
})

router.get('/search/:keyWords', auth, async (req, res) => {
  try {
    const keyWordsString = req.params.keyWords;
    const keyWords = keyWordsString.split(' ');
    const regexKeyWords = keyWords.join('|');

    const results = await Product.find({$or: [{tags: {$in: keyWords}}, {name: {$regex: regexKeyWords}}, {description: {$regex: regexKeyWords}}]})
    res.send(results)
  } catch (err) {
    console.log(err);
  }
})

router.get('/multiple-info', auth, async (req, res) => {
  try {
    const ids = Object.values(req.query);
    if (ids.length === 0) return res.status(200).send([]);

    const products = await Product.find({ '_id': { $in: ids }}, { createdAt: 0, __v: 0, _sold: 0 } );
    if (!products) return res.status(404).send('no products with provided ids found');

    
    const productsByOrderRecieved = ids.map(id => {
      const product = products.find(p => p._id.toString() === id);
      return product
    })

    res.send(productsByOrderRecieved);
  } catch (err) {
    if (err.path === '_id') return res.status(400).send('one of the ids is invalid');
    console.log(err.message);
    res.status(500).send('unexpected error');
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const productByName = await Product.findOne({ name: req.body.name });
    if (productByName && productByName._id.toString() !== req.params.id) {
      return res.status(400).send('Product name is taken');
    }

    const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!product) return res.status(404).send('Product cannot be found');
  
    const updatedProduct = await Product.findOne({ _id: req.params.id });
    res.send(updatedProduct);
  } catch (err) {
    handleErrors(err, res)
  }
})

router.get('/allowed-animals', authAdmin, async (req, res) => {
  res.send(allowedAnimals);
})

router.get('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    if (!product) return res.status(404).send('Product cannot be found');
    
    res.send(product); 
  } catch (err) {
    handleErrors(err, res);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    if (!product) return res.status(404).send('Product cannot be found');
  
    res.send(product)
  } catch (err) {
    handleErrors(err);
  }
})

module.exports = router;