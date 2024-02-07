import { FindShowRequest, FindShowResponse, SearchShowsRequest, SearchShowsResponse } from '@scheduler/shared';

import { axiosInstance } from './axios/instance';

const SHOWS_ENDPOINT = '/shows';

export const apiSearchShows = async ({ query }: SearchShowsRequest) => {
  return await axiosInstance.get<SearchShowsResponse>(
    `${SHOWS_ENDPOINT}/external/search`, {
      params: {
        query,
      }
    }
  ).then((response) => response.data.shows);
};

export const apiFindShow = async ({ externalId }: FindShowRequest) => {
  return await axiosInstance.get<FindShowResponse>(
    `${SHOWS_ENDPOINT}`, {
      params: {
        externalId,
      }
    }
  ).then((response) => response.data.show);
};