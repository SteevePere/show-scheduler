import { ShowObject } from '@scheduler/shared';

export interface ShowState {
  loading: boolean;
  searched: boolean;
  showsError: string | null;
  showsSuccess: string | null;
  shows: ShowObject[];
  show: ShowObject | null;
}