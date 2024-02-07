import { ShowState } from './shows.model';

export const showsInitialState: ShowState = {
  loading: false,
  searched: false,
  error: null,
  shows: [],
  show: null,
};