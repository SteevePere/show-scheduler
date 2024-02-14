import { SearchShowsRequest } from '@scheduler/shared';
import { Input } from 'antd';
import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchShows } from 'store/shows/shows.thunks';
import { RootState } from 'store/store';

const { Search } = Input;

const SearchShows = () => {
  const dispatch = useAppDispatch();
  const { push, location } = useHistory();
  const { loading } = useSelector((state: RootState) => state.shows);
  const [query, setQuery] = useState<string>();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has('query')) {
      const queryValue = searchParams.get('query') || undefined;
      setQuery(queryValue);
      searchTVShows({ query: queryValue });
    }
  }, []);

  const searchTVShows = useCallback((values: SearchShowsRequest) => {
    dispatch(searchShows(values));
  }, [dispatch]);
  
  const search = useCallback((query: string) => {
    push({ search: `?query=${query}` });
    searchTVShows({ query });
  }, [searchTVShows]);

  return (
    <Search
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      onSearch={(value) => search(value)}
      loading = { loading }
      placeholder='Find a Show'
      enterButton
      size='large'
    />
  );
};
        
export default SearchShows;