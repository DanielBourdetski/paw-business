import http from './httpService';

export const getAllowedAnimals = async () => await http.get('/products/allowed-animals');

// ? untested
export const addProduct = async (product) => await http.post('/products', product);

export const deleteProduct = async id => {
  const res = await http.delete(`/products/${id}`);
  return res.data;
}

// ? untested
export const updateProduct = async (updatedProduct, id) => await http.put(`/products/${id}`, updatedProduct);

export const getAllProducts = async () => {
  const res = await http.get('/products');
  return res.data;
};

export const getPopularProducts = async () => {
  const res = await http.get('/products/popular');
  return res.data
}

export const getProuctsByTag = async tag => {
  const res = await http.get('/products/tag/' + tag);
  return res.data;
};

export const getMultipleProductsInfo = async ids => {
  if (ids?.length === 0) return []
  
  const idsObj = {};
  ids.forEach((id, i) => idsObj[i] = id)

  const res = await http.get('/products/multiple-info', {params: idsObj});
  return res.data;
}

// ? untested
export const getProductInfo = async id => {
  const res = await http.get(`/products/${id}`);
  return res.data;
}

// ? untested
export const searchByKeywords = async keywords => {
  const res = await http.get(`/products/search/${keywords}`)
  return res.data
}

const productService = {
  addProduct,
  deleteProduct,
  updateProduct,
  getProuctsByTag,
  getMultipleProductsInfo,
  getProductInfo,
  getAllProducts,
  getPopularProducts,
  getAllowedAnimals,
  searchByKeywords
}

export default productService;