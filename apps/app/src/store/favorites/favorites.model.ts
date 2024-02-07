import { ShowObject } from '@scheduler/shared';

export interface FavoriteState {
  loading: boolean;
  error: string | null;
  favorite: ShowObject | null;
}