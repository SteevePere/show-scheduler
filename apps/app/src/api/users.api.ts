import { UpdateUserRequest, UpdateUserResponse } from '@scheduler/shared';

import { axiosInstance } from './axios/instance';

const USERS_ENDPOINT = '/users';

export const apiUpdateUser = async (id: string, data: UpdateUserRequest) => {
  return await axiosInstance.patch<UpdateUserResponse>(
    `${USERS_ENDPOINT}/${id}`, data,
  ).then((response) => response.data);
};