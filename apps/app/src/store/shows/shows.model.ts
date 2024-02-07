import { ShowObject } from '@scheduler/shared';

export interface ShowState {
  loading: boolean;
  searched: boolean;
  error: string | null;
  shows: ShowObject[];
  show: ShowObject | null;
}