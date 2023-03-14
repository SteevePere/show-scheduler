import axios, { AxiosInstance } from 'axios';

import { serverConfig } from '../../config/server.config';
import { sleep } from '../../utils/sleep.util';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: serverConfig.axios.baseUrl,
  ...serverConfig.axios.options,
});

axiosInstance.interceptors.response.use(async (response) => {
  await sleep(200);
  return response;
});