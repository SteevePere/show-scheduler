import { createAsyncThunk } from '@reduxjs/toolkit';
import { FindSeasonEpisodesRequest, FindShowRequest, SearchShowsRequest } from '@scheduler/shared';

import { apiFindSeasonEpisodes, apiFindShow, apiSearchShows } from '../../api/shows.api';

export const searchShows = createAsyncThunk('shows/searchShows', async (data: SearchShowsRequest) => {
  return await apiSearchShows(data);
});

export const findShow = createAsyncThunk('shows/findShow', async (data: FindShowRequest) => {
  return await apiFindShow(data);
});

export const findSeasonEpisodes = createAsyncThunk('shows/findSeasonEpisodes', async (data: FindSeasonEpisodesRequest) => {
  return await apiFindSeasonEpisodes(data);
});