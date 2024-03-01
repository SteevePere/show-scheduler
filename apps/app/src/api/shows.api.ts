import {
  FindSeasonEpisodesRequest, 
  FindSeasonEpisodesResponse,
  FindShowRequest,
  FindShowResponse,
  SearchShowsRequest,
  SearchShowsResponse,
  ToggleEpisodeWatchedRequest,
  ToggleEpisodeWatchedResponse,
  ToggleSeasonWatchedRequest,
  ToggleSeasonWatchedResponse
} from '@scheduler/shared';

import { axiosInstance } from './axios/instance';

const SHOWS_ENDPOINT = '/shows';
const SEASONS_ENDPOINT = '/seasons';
const EPISODES_ENDPOINT = '/episodes';

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

export const apiSetEpisodeWatched = async (data: ToggleEpisodeWatchedRequest) => {
  return await axiosInstance.post<ToggleEpisodeWatchedResponse>(
    `${EPISODES_ENDPOINT}/watched`, { ...data }
  ).then((response) => response.data.episode);
};

export const apiSetSeasonWatched = async (data: ToggleSeasonWatchedRequest) => {
  return await axiosInstance.post<ToggleSeasonWatchedResponse>(
    `${SEASONS_ENDPOINT}/watched`, { ...data }
  ).then((response) => response.data.season);
};