import { ShowObject } from '@scheduler/shared';

export interface ShowState {
  loading: boolean;
  error: string | null;
  data: ShowObject[];
}