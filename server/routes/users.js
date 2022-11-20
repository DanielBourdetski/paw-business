const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validateUser, validateUserUpdate, validatePassword } = require('../models/users')
const { auth, authAdmin } = require('../middleware/auth');
const { Product } = require('../models/products');
const { filterUserProperties } = require('../helpers/fns');

const handleUserNotFound = res => res.status(404).send('User with given ID not found.');

const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: { '$regex': req.body.email, $options: 'i' } });
  if (user) return res.status(403).send('User already exists');

  user = new User(req.body);

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  
  await user.save();

  const { _id, name, email, cart, favorites, isAdmin } = user;
  const token = user.generateAuthToken(_id);

  res.send({ _id, name, email, cart, favorites, isAdmin, token });
});

router.post('/add-to-cart', auth, async (req, res) => {
  try {
    const amountToAdd = req.body.amount || 1;
    if (!req.body.product) return res.status(400).send('Product id has not been provided');

    const { _id: productIdToAdd } = await Product.exists({ _id: req.body.product });
    if (!productIdToAdd.toString()) return res.status(404).send('Invalid id');

    const { user } = req;
    const indexOfProductInCart = user.cart.findIndex(p => p.product.toString() === productIdToAdd.toString());

    if (indexOfProductInCart === -1) {
      user.cart.push({ product: productIdToAdd, amount: amountToAdd });
      await user.save()
      return res.send(user.cart);
    }

    user.cart[indexOfProductInCart].amount += amountToAdd;
    await user.save();

    res.send(user.cart);
  } catch (err) {
    if (err.patch === '_id') return res.status(400).send('Invalid id');

    res.status(500).send('Unexpeced error has occured:', err.message);
  }
})

router.put('/add-or-reduce-in-cart/:action/:id', auth, async (req, res) => {
  try {
    const { _id: productIdToReduce } = await Product.exists({ _id: req.params.id });
    
    if (!productIdToReduce.toString()) return res.status(404).send('Invalid product id');
  
    const { user } = req;
  
    const indexOfProdcutInCart = user.cart.findIndex(p => p.product.toString() === productIdToReduce.toString());
    if (indexOfProdcutInCart === -1) return res.status(404).send('Product not in cart');

    const action = req.params.action;

    if (action === 'add') {
      user.cart[indexOfProdcutInCart].amount++;
    }

    if (action === 'reduce') {
      user.cart[indexOfProdcutInCart].amount === 1
        ? user.cart.splice(indexOfProdcutInCart, 1)
        : user.cart[indexOfProdcutInCart].amount -= 1
    }
    
    await user.save();
  
    res.send(user.cart[indexOfProdcutInCart]);
  } catch (err) {
    if (err.patch === '_id') return res.status(400).send('Invalid id');

    console.log(err);
    res.status(500).send('Unexpeced error');
  }
})

router.put('/reduce-from-cart', auth, async (req, res) => {
  try {
    const { _id: productIdToReduce } = await Product.exists({ _id: req.body.product });
    if (!productIdToReduce.toString()) return res.status(404).send('Invalid product id');
  
    const { user } = req;
  
    const indexOfProdcutInCart = user.cart.findIndex(p => p.product.toString() === productIdToReduce.toString());
    if (indexOfProdcutInCart === -1) return res.status(404).send('Product not in cart');
  
    user.cart[indexOfProdcutInCart].amount === 1
      ? user.cart.splice(indexOfProdcutInCart, 1)
      : user.cart[indexOfProdcutInCart].amount -= 1
    
    await user.save();
  
    res.send(user);
  } catch (err) {
    if (err.patch === '_id') return res.status(400).send('Invalid id');

    res.status(500).send('Unexpeced error has occured:', err.message);
  }
})

router.delete('/remove-from-cart/:id', auth, async (req, res) => {
  try {
    const productIdToRemove = (await Product.exists({_id: req.params.id}))?._id.toString() ;
  
    if (!productIdToRemove) return res.status(400).send('invalid id');
  
    const { user } = req;
    const indexOfProductInCart = user.cart.findIndex(p => p.product.toString() === productIdToRemove);
  
    if (indexOfProductInCart === -1) return res.status(404).send('product not in cart');

    const updatedCart = [...user.cart.slice(0, indexOfProductInCart), ...user.cart.slice(indexOfProductInCart + 1)];
    user.cart = updatedCart;
    await user.save();

    res.send(updatedCart);
  } catch (err) {
    if (err.path === '_id') return res.status(400).send('invalid id')
    
    res.status(500).send('unexpected error');
  }


})

router.post('/toggle-favorite/:id', auth, async (req, res) => {
  try {
    const { _id: productId } = await Product.exists({ _id: req.params.id });
    if (!productId) return res.status(400).send('invalid product id');
  
    const user = req.user;
    const indexOfProductInFavorites = user.favorites.findIndex(id => id.toString() === productId.toString());
  
    indexOfProductInFavorites === -1
      ? user.favorites.push(productId)
      : user.favorites.splice(indexOfProductInFavorites, 1);
  
    await user.save();
  
    res.send(user.favorites);
  } catch (err) {
    if (err.path === '_id') return res.status(400).send('invalid id')


    res.status(500).send('unexpected error');
  }
})

router.get('/favorites', auth, async (req, res) => {
  try {
    const favoriteIds = req.user.favorites;
    if (!favoriteIds.length) return res.send([]);

    const favorites = await Product.find({ '_id': { $in: favoriteIds }});

    res.send(favorites)
  } catch (err) {
    res.status(500).send('unexpected error');
  }
})

router.get('/account-info', auth, async (req, res) => {
  const {name, email, cart, favorites, createdAt, isAdmin} = req.user;
  res.send({name, email, cart, favorites, createdAt, isAdmin});
});

router.put('/update-account', auth, async (req, res) => {
  const { name, email, password } = req.body;
  const updatedUser = { name, email }

  const { error } = validateUserUpdate(updatedUser);
  if (error) return res.status(400).send(error.details[0].message);

  if (password) {
    const { error } = validatePassword({password})
    if (error) return res.status(400).send(error.details[0].message);

    updatedUser.password = password;
  }

  try {
    const userAfterUpdate = await User.findByIdAndUpdate(req.user._id, updatedUser, {new: true});
    if (!userAfterUpdate) return handleUserNotFound(res);

    const user = _.omit(userAfterUpdate, ['__v', 'password'])

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('unexpected error');
  }
})

// ------- admin requests ---------

router.get('/', authAdmin, async (req, res) => {
  try {
    const rawUsers = await User.find();
    const users = rawUsers.map(u => filterUserProperties(u));

    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send('unexpected error');
  }
})

router.put('/update-user/:id', auth, async (req, res) => {
  const userId = req.params.id;
  if (!userId) return res.status(400).send('No user id provided');
   
  const { name, email, password } = req.body;
  const userUpdate = {name, email};

  const { error: userError } = validateUserUpdate(userUpdate);
  if (userError) return res.status(400).send(userError.details[0].message);

  if (password) {
    const { error: passwordError } = validatePassword({password});
    if (passwordError) return res.status(400).send(passwordError.details[0].message);

    const hashed = await bcrypt.hash(password, 10);
    
    userUpdate.password = hashed;
  }

  try {
    const user = await User.findByIdAndUpdate(userId, userUpdate, { new: true });
    if (!user) return handleUserNotFound(res);

    const updatedUser = _.omit(user, ['password', '__v']);

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('unexpected error');
  }
})

router.get('/:id', authAdmin, async (req, res) => {
  const userId = req.params.id;

   try {
    const rawUser = await User.findById(userId);
    if (!rawUser) return handleUserNotFound(res);

    const user = filterUserProperties(rawUser);
    
    res.send(user);

   } catch (err) {
    console.log(err);
    res.status(500).send('unexpected error');
   }
})


router.put('/toggle-admin/:id', authAdmin, async (req, res) => {
  const userId = req.params.id;
   try {
    const rawUser = await User.findById(userId);

    if (!rawUser) return handleUserNotFound(res);

    if (rawUser._id.toString() === req.user._id.toString()) return res.status(403).send('Cannot self revoke admin status');

    rawUser.isAdmin = !rawUser.isAdmin;
    await rawUser.save();
    
    const user = filterUserProperties(rawUser);

    res.send(user);
   } catch (err) {
    console.log(err);
    res.status(500).send('unexpected error')
   }
})

router.delete('/:id', authAdmin, async (req, res) => {
  const userId = req.params.id;

  try {
    if (userId === req.user._id.toString()) return res.status(400).send('Cannot self delete user');

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return handleUserNotFound(res);

    const user = filterUserProperties(deletedUser)

    res.send(user);
  }  catch (err) {
    console.log(err);
    res.status(500).send('unexpected error');
  }
})

module.exports = router;