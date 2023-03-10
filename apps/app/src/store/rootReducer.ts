import { authSlice } from './auth/auth.slice';
import { showsSlice } from './shows/shows.slice';

export const reducer = {
  shows: showsSlice.reducer,
  auth: authSlice.reducer,
};