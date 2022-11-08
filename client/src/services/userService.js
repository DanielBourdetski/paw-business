import http from './httpService';

export const getAllUsers = async () => {
  const res = await http.get('users');
  return res.data
}

export const login = async data => {
  try {
    const res = await http.post('auth', data);

    const { name, email, cart, favorites, token } = res.data;
    const user = { name, email, cart, favorites, token };
    
    http.setJwt(token);
    return user
  } catch (err) {
    // TODO handle error
    console.log(err);
  }
}

export const signup = async data => {
  try {
    const res = await http.post('users', data)

    const { name, email, cart, token } = res.data;
    const user = { name, email, cart, token };

    http.setJwt(token);
    return user;
  } catch (err) {
    // TODO handle error
    console.log(err);
  }
}

export const signout = () => localStorage.removeItem('token');

export const saveToken = token => {
  localStorage.setItem('token', token);
  http.setJwt(token);
}

export const getToken = () => localStorage.getItem('token');

export const getAccountInfo = async () => {
  try {
    const res = await http.get('/users/account-info');
    return res.data
  } catch (err) {
    // TODO handle error
    console.log(err);
  }
}

// TODO test this
export const toggleFavorite = async id => {
  console.log(id);
  const res = await http.post(`/users/toggle-favorite/${id}`);
  return res.data;
}

export const addToCart = async (id, amount = 1) => {
  const res = await http.post('/users/add-to-cart', { product: id, amount });
  return res.data;
}

export const addOrReduceInCart = async (action, id) => {
  const res = await http.put(`/users/add-or-reduce-in-cart/${action}/${id}`);
  return res.data;
}

// TODO test this
export const removeFromCart = async id => {
  const res = await http.delete(`/users/remove-from-cart/${id}`);
  return res.data;
}

export const updateAccountInfo = async user => {
  const res = await http.put('/users/update-account', user);
  return res.data;
}

const userService = {
  getAllUsers,
  login,
  signup,
  signout,
  saveToken,
  getToken,
  getAccountInfo,
  updateAccountInfo,
  addToCart,
  toggleFavorite,
  addOrReduceInCart,
  removeFromCart
}

export default userService