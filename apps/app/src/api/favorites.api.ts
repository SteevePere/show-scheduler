import { CreateFavoriteRequest, CreateFavoriteResponse, RemoveFavoriteRequest, RemoveFavoriteResponse } from '@scheduler/shared';

import { axiosInstance } from './axios/instance';

const FAVORITES_ENDPOINT = '/favorites';

export const apiSaveFavorite = async (data: CreateFavoriteRequest) => {
  return await axiosInstance.post<CreateFavoriteResponse>(
    `${FAVORITES_ENDPOINT}`, { ...data }
  ).then((response) => response.data.show);
};

export const apiDeleteFavorite = async (data: RemoveFavoriteRequest) => {
  return await axiosInstance.delete<RemoveFavoriteResponse>(
    `${FAVORITES_ENDPOINT}`, { data }
  ).then((response) => response.data.show);
};