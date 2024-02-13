import { CreateFavoriteRequest, RemoveFavoriteRequest, ShowObject } from '@scheduler/shared';
import { Col, Empty, Row } from 'antd';
import LoadingSpinner from 'components/shared/LoadingSpinner/LoadingSpinner';
import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { createFavorite, deleteFavorite } from 'store/favorites/favorites.thunks';
import { selectShows } from 'store/shows/shows.slice';
import { RootState } from 'store/store';

import ShowCard from '../ShowCard/ShowCard';

const ShowList = () => {
  const state = useSelector(selectShows);
  const { loading: favoritesLoading } = useSelector((state: RootState) => state.favorites);
  const dispatch = useAppDispatch();
  
  const saveFavorite = useCallback((values: CreateFavoriteRequest) => {
    dispatch(createFavorite(values));
  }, []);

  const removeFavorite = useCallback((values: RemoveFavoriteRequest) => {
    dispatch(deleteFavorite(values));
  }, []);


  return (
    <Row gutter={[24, 24]}>
      {!state.loading && state.shows?.map((show: ShowObject) =>
        <Col
          xl={8}
          lg={24}
          md={24}
          xs={24}
          key={'col_' + show.externalId}
        >
          <ShowCard
            show={show}
            saveFavorite={saveFavorite}
            removeFavorite={removeFavorite}
            favoritesLoading={favoritesLoading}
            showFullText={false}
          />
        </Col>
      )}
      {!!state.searched && !state.loading && !state.shows?.length &&
        <Empty
          description='No Shows were found'
          style={{
            margin: 'auto',
            marginTop: '25vh',
            marginBottom: '25vh',
          }}
        />}
      {state.loading &&
      <Col span={24}>
        <LoadingSpinner marginTop='25vh' size='large'/>
      </Col>
      }
    </Row>
  );
};
        
export default ShowList;