import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: 'https://api.example.com',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 1000 * 600,
});

api.interceptors.request.use(
  (config) => {
    // loading(true); //로딩시작
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (res: AxiosResponse) => {
    // loading(false); //로딩종료
    // LOADING_STATE = true; //로딩값 원복
    // LOADING_SPINNER = QSpinnerCube; //스피너 모양 원복

    return res.config.originalResponse ? res : res.data;
  },
  (error) => {
    // loading(false); //로딩종료
    // LOADING_STATE = true; //로딩값 원복
    // LOADING_SPINNER = QSpinnerCube; //스피너 모양 원복

    const response = error.response;
    if (response) {
      return Promise.reject(response.data);
    }

    alert('인터넷 연결 상태를 확인해주세요');
    return new Promise(function () {});
  },
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
