import { SearchShowsRequest, SearchShowsResponse } from '@scheduler/shared';

import { axiosInstance } from './axios/instance';

const POSTS_ENDPOINT = '/shows';

export const apiSearchShows = async ({ query }: SearchShowsRequest) => {
  return await axiosInstance.get<SearchShowsResponse>(
    `${POSTS_ENDPOINT}/external/search`, {
      params: {
        query,
      }
    }
  ).then((response) => response.data.shows);
};