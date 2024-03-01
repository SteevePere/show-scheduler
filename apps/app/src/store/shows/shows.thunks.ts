import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FindSeasonEpisodesRequest,
  FindShowRequest,
  SearchShowsRequest,
  ToggleEpisodeWatchedRequest,
  ToggleSeasonWatchedRequest,
} from '@scheduler/shared';
import axios from 'axios';

import { apiFindSeasonEpisodes, apiFindShow, apiSearchShows, apiSetEpisodeWatched, apiSetSeasonWatched } from '../../api/shows.api';

export const searchShows = createAsyncThunk('shows/searchShows', async (data: SearchShowsRequest) => {
  return await apiSearchShows(data);
});

export const findShow = createAsyncThunk('shows/findShow', async (data: FindShowRequest) => {
  return await apiFindShow(data);
});

export const findSeasonEpisodes = createAsyncThunk('shows/findSeasonEpisodes', async (data: FindSeasonEpisodesRequest) => {
  return await apiFindSeasonEpisodes(data);
});

export const setEpisodeWatched = 
  createAsyncThunk('shows/setEpisodeWatched', async (data: ToggleEpisodeWatchedRequest, { rejectWithValue }) => {
    try {
      return await apiSetEpisodeWatched(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.statusCode);    
      }
      return rejectWithValue(error); 
    }
  });

export const setSeasonWatched = 
  createAsyncThunk('shows/setSeasonWatched', async (data: ToggleSeasonWatchedRequest, { rejectWithValue }) => {
    try {
      return await apiSetSeasonWatched(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.statusCode);    
      }
      return rejectWithValue(error); 
    }
  });