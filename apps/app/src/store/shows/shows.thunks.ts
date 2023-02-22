import { createAsyncThunk } from "@reduxjs/toolkit";
import { SearchShowsRequest } from "@scheduler/shared";

import { apiSearchShows } from "../../api/shows.api";

export const searchShows = createAsyncThunk('shows/searchShows', async (data: SearchShowsRequest) => {
    return await apiSearchShows(data);
});