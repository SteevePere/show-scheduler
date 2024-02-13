import { CreateFavoriteRequest, FindShowRequest, RemoveFavoriteRequest, SeasonObject } from '@scheduler/shared';
import { Col, Divider, Empty, Row } from 'antd';
import LoadingSpinner from 'components/shared/LoadingSpinner/LoadingSpinner';
import SeasonCard from 'components/shows/SeasonCard/ShowCard/SeasonCard';
import ShowCard from 'components/shows/ShowCard/ShowCard';
import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createFavorite, deleteFavorite } from 'store/favorites/favorites.thunks';
import { findShow } from 'store/shows/shows.thunks';
import { RootState } from 'store/store';

interface IRouteParams {
  showId: string;
}

export const ShowView = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { loading, showsError, show } = useSelector((state: RootState) => state.shows);
  const { loading: favoritesLoading } = useSelector((state: RootState) => state.favorites);
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

  const removeFavorite = useCallback((values: RemoveFavoriteRequest) => {
    dispatch(deleteFavorite(values));
  }, [dispatch]);

  if (!currentUser) {
    return null;
  }

  return (
    <Row>
      <Col span={12}>
        <h1>
          Show Details
        </h1>
        <Col span={23}>
          <Divider/>
          {show && !loading &&
            <ShowCard
              show={show}
              saveFavorite={saveFavorite}
              removeFavorite={removeFavorite}
              favoritesLoading={favoritesLoading}
              hideViewButton={true}
            />}
          {loading &&
            <Col span={24}>
              <LoadingSpinner marginTop='25vh' size='large'/>
            </Col>}
          {!!showsError && !loading &&
            <Empty
              description='Show not found'
              style={{
                margin: 'auto',
                marginTop: '25vh',
                marginBottom: '25vh',
              }}
            />}
        </Col>
      </Col>
      <Col span={12}>
        <h1>
          Seasons
        </h1>
        <Col span={23}>
          <Divider/>
          {show && show.seasons && !loading && show.seasons.map((season: SeasonObject) =>
            <Row key={`row_${season.externalId}`} style={{ marginBottom: 20 }}>
              <SeasonCard key={`season_card_${season.externalId}`} season={season}/>
            </Row>
          )}
          {loading &&
            <Col span={24}>
              <LoadingSpinner marginTop='25vh' size='large'/>
            </Col>}
        </Col>
      </Col>
    </Row>
  );
};
