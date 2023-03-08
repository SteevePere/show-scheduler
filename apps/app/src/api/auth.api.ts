import { SignInRequest, SignInResponse } from '@scheduler/shared';

import { axiosInstance } from './axios/instance';

const AUTH_ENDPOINT = '/authentication';

export const apiSignIn = async (data: SignInRequest) => {
  return await axiosInstance.post<SignInResponse>(
    `${AUTH_ENDPOINT}/sign-in`, data,
  ).then((response) => response.data);
};