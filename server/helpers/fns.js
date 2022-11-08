const _ = require('lodash');

const filterUserProperties = user => _.pick(user, ['_id', 'name', 'email', 'cart', 'favorites', 'isAdmin', 'createdAt']);

module.exports = {
  filterUserProperties
}