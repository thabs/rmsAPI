import axios from 'axios';

const instance = axios.create({baseURL: '/api'});

//! Response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data.error);
    } else if (error.request) {
      return Promise.reject({message: error.request});
    } else return Promise.reject(error);
  },
);

export default instance;
