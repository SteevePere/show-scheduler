import { FavoriteState } from 'store/favorites/favorites.model';

export const favoritesInitialState: FavoriteState = {
  loading: {
    state: false, 
    showExtId: null,
    showId: null,
  },
  favoritesError: null,
  favoritesSuccess: null,
  favorite: null,
};