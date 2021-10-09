import axios, { AxiosRequestConfig } from 'axios';

export const getApiInstance = (config: AxiosRequestConfig) =>
  axios.create(config);
