import { CreateFavoriteRequest, FindShowRequest } from '@scheduler/shared';
import { Col, Empty, Row } from 'antd';
import LoadingSpinner from 'components/shared/LoadingSpinner/LoadingSpinner';
import ShowCard from 'components/shows/ShowCard/ShowCard';
import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createFavorite } from 'store/favorites/favorites.thunks';
import { findShow } from 'store/shows/shows.thunks';
import { RootState } from 'store/store';

interface IRouteParams {
  showId: string;
}

export const ShowView = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { loading, error, show } = useSelector((state: RootState) => state.shows);
  const dispatch = useAppDispatch();
  const { showId } = useParams<IRouteParams>();

  useEffect(() => {
    if (showId) {
      fetchShow({ externalId: +showId });
    }
  }, [showId]);
  
  const fetchShow = useCallback((values: FindShowRequest) => {
    dispatch(findShow(values));
  }, [dispatch]);

  const saveFavorite = useCallback((values: CreateFavoriteRequest) => {
    dispatch(createFavorite(values));
  }, [dispatch]);

  if (!currentUser) {
    return null;
  }

  return (
    <Row align='middle' justify='center'>
      <Col
        span={24}
        md={{ span: 18 }}
      >
        {show && !loading &&
        <ShowCard
          show={show}
          saveFavorite={saveFavorite}
          hideViewButton={true}
        />}
        {loading &&
        <Col span={24}>
          <LoadingSpinner marginTop='25vh' size='large'/>
        </Col>}
        {!!error && !loading &&
        <Empty
          description='Show not found'
          style={{
            margin: 'auto',
            marginTop: '25vh',
            marginBottom: '25vh',
          }}
        />}
      </Col>
    </Row>
  );
};
