import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3001/';

// axios.interceptors.request.use(req => req, error => Promise.reject(error));

export const setJwt = token => {
  axios.defaults.headers.common['x-auth-token'] = token;
}

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setJwt
};

export default httpService