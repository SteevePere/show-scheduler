import { ShowObject } from '@scheduler/shared';

export interface FavoriteLoading {
  state: boolean;
  showExtId?: number | null,
  showId?: string | null,
}

export interface FavoriteState {
  loading: FavoriteLoading;
  favoritesError: string | null;
  favoritesSuccess: string | null;
  favorite: ShowObject | null;
}