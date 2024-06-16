import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { appCookies } from "./appCookies";
import Cookies from 'js-cookie';

const defaultOptions: AxiosRequestConfig = {
  timeout: 30000,
  baseURL: process.env.NEXT_PUBLIC_APP_SERVICE_URL,
};

const redirectLogin = () => {
  const { removeCookie } = appCookies();
  removeCookie({ name: 'access_token' });
  window.location.pathname = '/login';
};

export const axiosInstance = axios.create(defaultOptions);

export const axiosInterceptorRequest = async (requestConfig: InternalAxiosRequestConfig) => {
  const access_token_cookie = Cookies.get('access_token') ?? localStorage.getItem('access_token');
  requestConfig.headers.Authorization = `Bearer ${access_token_cookie}`;
  return requestConfig;
};

export const axiosInterceptorResponseError = async (error: AxiosError) => {
  const status = error.response ? error.response.status : null;
  if (status === 401) {
    redirectLogin();
  }
  return Promise.reject(error);
}

axiosInstance.interceptors.request.use(axiosInterceptorRequest, (err) => err);
axiosInstance.interceptors.response.use((res) => res, axiosInterceptorResponseError);

export default axiosInstance;
