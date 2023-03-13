import { CurrentUserResponse, RegistrationRequest, RegistrationResponse, SignInRequest, SignInResponse } from '@scheduler/shared';

import { axiosInstance } from './axios/instance';

const AUTH_ENDPOINT = '/authentication';

export const apiSignUp = async (data: RegistrationRequest) => {
  return await axiosInstance.post<RegistrationResponse>(
    `${AUTH_ENDPOINT}/register`, data,
  ).then((response) => response.data);
};

export const apiSignIn = async (data: SignInRequest) => {
  return await axiosInstance.post<SignInResponse>(
    `${AUTH_ENDPOINT}/sign-in`, data,
  ).then((response) => response.data);
};

export const apiSignOut = async () => {
  return await axiosInstance.post(
    `${AUTH_ENDPOINT}/sign-out `,
  ).then((response) => response.data);
};

export const apiGetCurrentUser = async () => {
  return await axiosInstance.get<CurrentUserResponse>(
    `${AUTH_ENDPOINT}/current-user`,
  ).then((response) => response.data.user);
};