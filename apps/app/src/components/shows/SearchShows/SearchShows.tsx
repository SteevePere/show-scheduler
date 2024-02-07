import { SearchShowsRequest } from '@scheduler/shared';
import { Input } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const { Search } = Input;

interface ISearchShowsProps {
  searchShows: (values: SearchShowsRequest) => void;
  loading: boolean;
}

const SearchShows = (props: ISearchShowsProps) => {
  const { searchShows, loading } = props;
  const { push, location } = useHistory();

  const [query, setQuery] = useState<string>();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
      
    if (searchParams.has('query')) {
      setQuery(searchParams.get('query') || undefined);
    }
  }, []);
  
  const search = useCallback((query: string) => {
    push({ search: `?query=${query}` });
    searchShows({ query });
  }, [searchShows]);

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