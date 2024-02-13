import { ShowState } from './shows.model';

export const showsInitialState: ShowState = {
  loading: false,
  searched: false,
  showsError: null,
  showsSuccess: null,
  shows: [],
  show: null,
};