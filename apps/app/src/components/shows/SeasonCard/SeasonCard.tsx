import {
  ArrowUpOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { SeasonObject } from '@scheduler/shared';
import { Button, Card } from 'antd';
import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { setEpisodes } from 'store/shows/shows.slice';
import { findSeasonEpisodes } from 'store/shows/shows.thunks';
import { RootState } from 'store/store';

import SeasonCardBody from './SeasonCardBody/SeasonCardBody';
import SeasonCardHeader from './SeasonCardHeader/SeasonCardHeader';

interface ISeasonCardProps {
  season: SeasonObject;
  hideViewButton?: boolean;
  SeasonFullText?: boolean;
};

const SeasonCard = (props: ISeasonCardProps) => {
  const { season, hideViewButton = false } = props;
  const dispatch = useAppDispatch();

  const { episodes, episodesLoading } = useSelector((state: RootState) => state.shows);
    
  const isEpisodesLoaded = useMemo(() => {
    return episodes.episodes.length > 0 &&
      episodes.seasonExternalId === season.externalId;
  }, [season, episodes]);

  const seasonEpisodes = useMemo(() => {
    return isEpisodesLoaded ? episodes.episodes : [];
  }, [isEpisodesLoaded, episodes.episodes]);

  const isEpisodesLoading = useMemo(() => {
    return episodesLoading.state === true 
      && episodesLoading.seasonExternalId === season.externalId;
  }, [season.externalId, episodesLoading]);

  const handleExpand = useCallback(async () => {
    dispatch(findSeasonEpisodes({ seasonExternalId: season.externalId }));
  }, [season, findSeasonEpisodes]);

  const handleCollapse = useCallback(() => {
    dispatch(setEpisodes({
      seasonExternalId: null,
      episodes: [],
    }));
  }, [setEpisodes]);

  const ViewButton = () => {
    return (
      <Button
        onClick={isEpisodesLoaded ? handleCollapse : handleExpand}
        loading={isEpisodesLoading}
        icon={isEpisodesLoaded ? <ArrowUpOutlined/> : <EyeOutlined/>}
      >
        {isEpisodesLoaded ? 'Hide Episodes' : 'View Episodes'}
      </Button>
    );
  };

  const getActions = useCallback(() => {
    return hideViewButton ? undefined : [<ViewButton key='view'/>];
  }, [isEpisodesLoading, isEpisodesLoaded, hideViewButton]);

  const displayCard = () => {
    return (
      <Card
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
        }}
        bodyStyle={{
          flexGrow: '1',
        }}
        actions={getActions()}
      >
        <SeasonCardHeader
          {...props}
          backgroundPosition='0 -70px'
        />
        <SeasonCardBody
          {...props}
          episodes={seasonEpisodes}
        />
      </Card>
    );
  };

  return displayCard();
};

export default SeasonCard;
