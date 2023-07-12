import axios, {AxiosInstance} from 'axios';
import { store } from '../redux/store';
import { BASE_URL} from './constants';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
export const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
export const HTTP_APP: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
export const initialConfig = () => {
  HTTP_CLIENT.interceptors.request.use(
    config => {
      const {user} = store.getState().root;
      console.log('user token', user?.formdata);

      if (user && user.formdata.token && config.headers) {
        config.headers.Authorization = `Bearer ${user?.formdata.token}`;
      }
      return config;
    },
    err => Promise.reject(err),
  );
};
// HTTP_CLIENT.interceptors.request.use(
//   config => {
//     const { user } = store.getState().root;
//     console.log('user token',user?.user?.token);

//     if (user && user?.user?.token && config.headers) {

//       config.headers.Authorization = `Bearer ${user?.user?.token}`;
//     }
//     return config;
//   },
//   err => Promise.reject(err),
// );
export const setupAxios = () => {
  HTTP_CLIENT.interceptors.request.use(
    config => {
      const {user} = store.getState().root;

      if (user && user?.user && config.headers) {
        debugger;
        config.headers.Authorization = `Bearer ${user?.user}`;
      }
      return config;
    },
    err => Promise.reject(err),
  );
};