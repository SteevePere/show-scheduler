import { SearchShowsRequest } from '@scheduler/shared';
import { Input } from 'antd';

const { Search } = Input;

interface ISearchShowsProps {
  searchShows: (values: SearchShowsRequest) => void;
  loading: boolean;
}

const SearchShows = (props: ISearchShowsProps) => {
  const { searchShows, loading } = props;

  return (
    <>
      <Search
        onSearch={(value) => searchShows({ query: value })}
        loading = { loading }
        placeholder='Find a Show'
        enterButton/>
    </>
  );
};
        
export default SearchShows;