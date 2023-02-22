import axios, { AxiosInstance } from 'axios';

import { serverConfig } from '../../config/server.config';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: serverConfig.axios.baseUrl,
  ...serverConfig.axios.options,
});