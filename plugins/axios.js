import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { useLoadingStore } from '@/stores/loading'; // ایمپورت استور

export default defineNuxtPlugin((nuxtApp) => {
  const { public: { apiBaseUrlAcc, apiBaseUrlServ } } = useRuntimeConfig();
  const toast = useToast();
  const i18n = nuxtApp.$i18n;
  const t = i18n?.t || ((key) => key);

  const loadingStore = useLoadingStore();

  const accapi = axios.create({ baseURL: apiBaseUrlAcc });
  const servapi = axios.create({ baseURL: apiBaseUrlServ });

  const updateAuthHeader = (token) => {
    accapi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    servapi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  if (import.meta.client) {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      updateAuthHeader(token);
    }
  }

  const checkInternetConnection = () => navigator.onLine;

  const errorHandler = (error) => {
    loadingStore.setLoading(false);

    if (!error.response) {
      toast.add({ severity: 'error', summary: t('error.title'), detail: t('error.no_internet'), life: 3000 });
    } else {
      const { status, data } = error.response;
      let message = t('error.default');

      if (status === 400) message = data.message || t('error.bad_request');
      else if (status === 401) message = t('error.unauthorized');
      else if (status === 403) message = t('error.forbidden');
      else if (status === 404) message = t('error.not_found');
      else if (status === 500) message = t('error.server');

      toast.add({ severity: 'error', summary: t('error.title'), detail: message, life: 3000 });
    }

    return Promise.reject(error);
  };

  accapi.interceptors.request.use(
    (config) => {
      if (!checkInternetConnection()) {
        return Promise.reject({ message: t('error.no_internet') });
      }
      loadingStore.setLoading(true);
      return config;
    },
    (error) => {
      loadingStore.setLoading(false);
      return Promise.reject(error);
    }
  );

  servapi.interceptors.request.use(
    (config) => {
      if (!checkInternetConnection()) {
        return Promise.reject({ message: t('error.no_internet') });
      }
      loadingStore.setLoading(true);
      return config;
    },
    (error) => {
      loadingStore.setLoading(false);
      return Promise.reject(error);
    }
  );

  accapi.interceptors.response.use(
    (response) => {
      loadingStore.setLoading(false);
      return response;
    },
    errorHandler
  );

  servapi.interceptors.response.use(
    (response) => {
      loadingStore.setLoading(false);
      return response;
    },
    errorHandler
  );

  return {
    provide: {
      accapi,
      servapi,
      updateAuthHeader,
    },
  };
});
