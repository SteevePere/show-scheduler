import { EpisodeObject } from '@scheduler/shared';
import { Card } from 'antd';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import EpisodeCardBody from './EpisodeCardBody/EpisodeCardBody';
import EpisodeCardHeader from './EpisodeCardHeader/EpisodeCardHeader';
import { WatchedButton } from './WatchedButton/WatchedButton';

interface IEpisodeCardProps {
  episode: EpisodeObject;
};

const EpisodeCard = (props: IEpisodeCardProps) => {
  const { episode } = props;
  const { show } = useSelector((state: RootState) => state.shows);

  const getActions = useCallback(() => {
    return show?.isFavoritedByUser ?
      [<WatchedButton
        key={`watched_button_${episode.externalId}`}
        episode={episode}
      />] : undefined;
  }, [episode, show?.isFavoritedByUser]);

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
        bordered={false}
        actions={getActions()}
      >
        <EpisodeCardHeader episode={episode}/>
        <EpisodeCardBody episode={episode}/>
      </Card>
    );
  };

  return displayCard();
};

export default EpisodeCard;