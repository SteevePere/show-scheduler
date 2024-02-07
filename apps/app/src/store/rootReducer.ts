import { authSlice } from './auth/auth.slice';
import { favoritesSlice } from './favorites/favorites.slice';
import { showsSlice } from './shows/shows.slice';

export const reducer = {
  auth: authSlice.reducer,
  shows: showsSlice.reducer,
  favorites: favoritesSlice.reducer,
};