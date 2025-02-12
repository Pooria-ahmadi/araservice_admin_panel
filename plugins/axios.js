import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const { public: { apiBaseUrlAcc, apiBaseUrlServ } } = useRuntimeConfig();

  const accapi = axios.create({
    baseURL: apiBaseUrlAcc,
  });

  const servapi = axios.create({
    baseURL: apiBaseUrlServ,
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