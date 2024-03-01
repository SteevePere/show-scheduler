import { SeasonObject } from '@scheduler/shared';
import { Card } from 'antd';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import ExpandEpisodesButton from './ExpandEpisodesButton/ExpandEpisodesButton';
import SeasonCardBody from './SeasonCardBody/SeasonCardBody';
import SeasonCardHeader from './SeasonCardHeader/SeasonCardHeader';
import { WatchedButton } from './WatchedButton/WatchedButton';

interface ISeasonCardProps {
  season: SeasonObject;
  SeasonFullText?: boolean;
};

const SeasonCard = (props: ISeasonCardProps) => {
  const { season } = props;

  const { show, episodes } = useSelector((state: RootState) => state.shows);
    
  const isEpisodesLoaded = useMemo(() => {
    return episodes.episodes.length > 0 &&
      episodes.seasonExternalId === season.externalId;
  }, [season, episodes]);

  const seasonEpisodes = useMemo(() => {
    return isEpisodesLoaded ? episodes.episodes : [];
  }, [isEpisodesLoaded, episodes.episodes]);

  const getActions = () => {
    const actions = [
      <ExpandEpisodesButton key='expand_btn' season={season}/>
    ];
    if (show?.isFavoritedByUser) {
      actions.push(
        <WatchedButton season={season} episodes={seasonEpisodes}/>
      );
    };
    return actions;
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
          show={show}
          backgroundPosition={'0 -70px'}
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
