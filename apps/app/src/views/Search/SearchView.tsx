import { SearchShowsRequest } from '@scheduler/shared';
import SearchShows from 'components/search/SearchShows';
import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { searchShows } from 'store/shows/shows.thunks';
import { RootState } from 'store/store';
import { openNotification } from 'utils/notification.util';

export const SearchView = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { loading, error } = useSelector((state: RootState) => state.shows);
  const dispatch = useAppDispatch();
  
  const searchTVShows = useCallback((values: SearchShowsRequest) => {
    dispatch(searchShows(values));
  }, []);

  useEffect(() => {
    if (error) {
      openNotification({ type: 'error', message: 'Authentication Failed', description: 'Wrong email or password!' });
    }
  }, [error]);

  if (!currentUser) {
    return null;
  }

  return (
    <SearchShows searchShows={searchTVShows} loading={loading}/>
  );
};
