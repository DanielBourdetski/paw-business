const jwt = require('jsonwebtoken')
const { jwtKey } = require('../config/config');
const { User } = require('../models/users');

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('No token');

  try {
    const user = jwt.verify(token, jwtKey);
    req.user = await User.findById(user._id);

    if (!req.user?.name) return res.status(401).send('No authorization');

    next();
  } catch (err) {
    res.status(400).send('Invalid token: ' + err.message || err);
  }
}

const authAdmin = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('No token');

  try {
    const user = jwt.verify(token, jwtKey);
    req.user = await User.findById(user._id)

    if (!req.user) throw new Error('no user')
    
    if (!req.user.isAdmin) throw new Error('Unauthorized');
    next();
  } catch (err) {
    if (err.message === 'Unauthorized')
      return res.status(403).send('You do not have premission to view this content');
    
    if (err.message === 'no user')
      return res.status(404).send('Invalid user ID')

    res.status(400).send('Problem authenticating: ' + err.message || err);
  }
}

module.exports = { 
  auth,
  authAdmin
};
