import { SearchShowsRequest } from '@scheduler/shared';
import { Col, Divider, Row } from 'antd';
import SearchShows from 'components/shows/SearchShows/SearchShows';
import ShowList from 'components/shows/ShowList/ShowList';
import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchShows } from 'store/shows/shows.thunks';
import { RootState } from 'store/store';
import { openNotification } from 'utils/notification.util';

export const SearchView = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { loading, error } = useSelector((state: RootState) => state.shows);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(history.location.search);
    if (searchParams.has('query')) {
      const queryValue = searchParams.get('query') || undefined;
      searchTVShows({ query: queryValue });
    }
  }, []);
  
  const searchTVShows = useCallback((values: SearchShowsRequest) => {
    dispatch(searchShows(values));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      openNotification({ type: 'error', message: 'Authentication Failed', description: 'Wrong email or password!' });
    }
  }, [error]);

  if (!currentUser) {
    return null;
  }

  return (
    <Row align='middle' justify='center' style={{ paddingBottom: 25 }}>
      <Col
        span={24}
        md={{ span: 18 }}
      >
        <SearchShows searchShows={searchTVShows} loading={loading}/>
        <Divider/>
        <ShowList/>
      </Col>
    </Row>
  );
};
