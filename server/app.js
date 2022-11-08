const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/users')
const products = require('./routes/products');
const payment = require('./routes/payment')
const auth = require('./routes/auth')

const app = express();
const PORT = 3001

mongoose.connect('mongodb://localhost/paw-business')
  .then(() => console.log('connected to mongo'))
  .catch(err => console.log(err))

app.use(express.json());
app.use(cors())

const dataToLog = ':method :url :status :req[x-auth-token]'
app.use(morgan(dataToLog, { skip: (_, res) => res.statusCode < 400 }))

app.use('/users', users);
app.use('/products', products);
app.use('/payment', payment);
app.use('/auth', auth);

app.listen(PORT, () => console.log(`listening to port ${PORT}`));