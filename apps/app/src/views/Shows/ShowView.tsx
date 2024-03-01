import {
  AlignRightOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { FindShowRequest } from '@scheduler/shared';
import { Col, Divider, Empty, Row } from 'antd';
import LoadingSpinner from 'components/shared/LoadingSpinner/LoadingSpinner';
import SeasonList from 'components/shows/SeasonList/SeasonList';
import ShowCard from 'components/shows/ShowCard/ShowCard';
import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findSeasonEpisodes, findShow } from 'store/shows/shows.thunks';
import { RootState } from 'store/store';

interface IRouteParams {
  showId: string;
}

export const ShowView = () => {
  const { loading, show, seasons } = useSelector((state: RootState) => state.shows);
  const dispatch = useAppDispatch();
  const { showId } = useParams<IRouteParams>();
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('expandedSeason')) {
      const expandedSeason = searchParams.get('expandedSeason');
      if (expandedSeason) {
        dispatch(findSeasonEpisodes({ seasonExternalId: +expandedSeason }));
      }
    }
  }, []);

  useEffect(() => {
    if (showId) {
      fetchShow({ externalId: +showId });
    }
  }, [showId]);
  
  const fetchShow = useCallback((values: FindShowRequest) => {
    dispatch(findShow(values));
    setIsFetched(true);
  }, [dispatch]);
  
  const isNotFound = useMemo(() => {
    return isFetched && !show && !loading;
  }, [isFetched, show, loading]);
  
  return (
    <Row>
      {loading &&
      <Col span={24}>
        <LoadingSpinner marginTop='25vh' size='large'/>
      </Col>}

      {isNotFound &&
      <Col span={24}>
        <Empty
          description='Show not found'
          className='empty'
        />
      </Col>}
      
      {!isNotFound && !loading &&
      <>
        <Col span={12}>
          <h1>
            <AlignRightOutlined/> Details
          </h1>
          <Col span={23}>
            <Divider/>
            {show && <ShowCard show={show} hideViewButton={true}/>}
          </Col>
        </Col>
        <Col span={12}>
          <h1>
            <PlayCircleOutlined /> Seasons
          </h1>
          <Col span={23}>
            <Divider/>
            <SeasonList seasons={seasons.seasons} loading={loading}/>
          </Col>
        </Col>
      </>}
    </Row>
  );
};
