import {
  FindSeasonEpisodesRequest, 
  FindSeasonEpisodesResponse,
  FindShowRequest,
  FindShowResponse,
  SearchShowsRequest,
  SearchShowsResponse
} from '@scheduler/shared';

import { axiosInstance } from './axios/instance';

const SHOWS_ENDPOINT = '/shows';
const SEASONS_ENDPOINT = '/seasons';

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

export const apiFindSeasonEpisodes = async ({ seasonExternalId }: FindSeasonEpisodesRequest) => {
  return await axiosInstance.get<FindSeasonEpisodesResponse>(
    `${SEASONS_ENDPOINT}/${seasonExternalId}/episodes`,
  ).then((response) => response.data.episodes);
};