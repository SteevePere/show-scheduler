import { createAsyncThunk } from '@reduxjs/toolkit';
import { FindShowRequest, SearchShowsRequest } from '@scheduler/shared';

import { apiFindShow, apiSearchShows } from '../../api/shows.api';

export const searchShows = createAsyncThunk('shows/searchShows', async (data: SearchShowsRequest) => {
  return await apiSearchShows(data);
});

export const findShow = createAsyncThunk('shows/findShow', async (data: FindShowRequest) => {
  return await apiFindShow(data);
});