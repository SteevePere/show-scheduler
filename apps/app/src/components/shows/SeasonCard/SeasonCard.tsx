import { SeasonObject } from '@scheduler/shared';
import { Card } from 'antd';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import ExpandEpisodesButton from './ExpandEpisodesButton/ExpandEpisodesButton';
import SeasonCardBody from './SeasonCardBody/SeasonCardBody';
import SeasonCardHeader from './SeasonCardHeader/SeasonCardHeader';

interface ISeasonCardProps {
  season: SeasonObject;
  hideViewButton?: boolean;
  SeasonFullText?: boolean;
};

const SeasonCard = (props: ISeasonCardProps) => {
  const { season, hideViewButton = false } = props;

  const { episodes } = useSelector((state: RootState) => state.shows);
    
  const isEpisodesLoaded = useMemo(() => {
    return episodes.episodes.length > 0 &&
      episodes.seasonExternalId === season.externalId;
  }, [season, episodes]);

  const seasonEpisodes = useMemo(() => {
    return isEpisodesLoaded ? episodes.episodes : [];
  }, [isEpisodesLoaded, episodes.episodes]);

  const getActions = () => {
    return hideViewButton ? 
      undefined : [<ExpandEpisodesButton key={'expand_btn'} season={season}/>];
  };

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
