import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const accapi = axios.create({
    baseURL: 'http://localhost:8000/api/', 
  });

  const servapi = axios.create({
    baseURL: 'http://localhost:8080/api/v1/company/',
  });

  const updateAuthHeader = (token) => {
    accapi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    servapi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const checkInternetConnection = () => {
    return navigator.onLine;
  };

  accapi.interceptors.request.use(
    (config) => {
      if (!checkInternetConnection()) {
        return Promise.reject({ message: 'No Internet Connection' });
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  servapi.interceptors.request.use(
    (config) => {
      if (!checkInternetConnection()) {
        return Promise.reject({ message: 'No Internet Connection' });
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return {
    provide: {
      accapi,
      servapi,
      updateAuthHeader,
    },
  };
});
