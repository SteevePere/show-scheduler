import {
  EyeOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { EpisodeObject, SeasonObject } from '@scheduler/shared';
import { Button, Card } from 'antd';
import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { findSeasonEpisodes } from 'store/shows/shows.thunks';

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
  
  const [episodes, setEpisodes] = useState<EpisodeObject[]>([]);
  const [fetchingEpisodes, setFetchingEpisodes] = useState<boolean>(false);

  useEffect(() => {
    if (fetchingEpisodes) {
      fetchEpisodes();
    }
  }, [fetchingEpisodes]);

  const isEpisodesLoaded = useMemo(() => {
    return episodes.length > 0;
  }, [episodes.length]);

  const fetchEpisodes = useCallback(async () => {
    const episodes = await dispatch(findSeasonEpisodes({ seasonExternalId: season.externalId })).unwrap();
    setEpisodes(episodes);
    setFetchingEpisodes(false);
  }, [setEpisodes, setFetchingEpisodes]);

  const handleExpand = useCallback(() => {
    setFetchingEpisodes(true);
  }, [setFetchingEpisodes]);

  const handleCollapse = useCallback(() => {
    setEpisodes([]);
  }, [setEpisodes]);

  const ViewButton = () => {
    return (
      <Button
        onClick={isEpisodesLoaded ? handleCollapse : handleExpand}
        loading={fetchingEpisodes}
        icon={isEpisodesLoaded ? <ArrowUpOutlined/> : <EyeOutlined/>}
      >
        {isEpisodesLoaded ? 'Hide Episodes' : 'View Episodes'}
      </Button>
    );
  };

  const getActions = () => {
    const actions = [];

    if (!hideViewButton) {
      actions.push(<ViewButton key='view'/>);
    }

    return actions;
  };

  const displayCard = () => {
    return (
      <Card
        hoverable={!hideViewButton}
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
          episodes={episodes}
        />
      </Card>
    );
  };

  return displayCard();
};

export default SeasonCard;
