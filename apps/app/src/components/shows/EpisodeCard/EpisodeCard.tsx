import { EpisodeObject, SeasonObject } from '@scheduler/shared';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import ExpandEpisodesButton from '../SeasonCard/ExpandEpisodesButton/ExpandEpisodesButton';
import EpisodeCardBody from './EpisodeCardBody/EpisodeCardBody';
import EpisodeCardHeader from './EpisodeCardHeader/EpisodeCardHeader';
import { WatchedButton } from './WatchedButton/WatchedButton';

interface IEpisodeCardProps {
  season: SeasonObject;
  episode: EpisodeObject;
};

const EpisodeCard = (props: IEpisodeCardProps) => {
  const { season, episode } = props;
  const { show } = useSelector((state: RootState) => state.shows);

  const getActions = () => {
    const actions = [
      <ExpandEpisodesButton key='expand_btn' season={season}/>
    ];
    if (show?.isFavoritedByUser) {
      actions.unshift(
        <WatchedButton
          key={`watched_button_${episode.externalId}`}
          episode={episode}
        />
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
        bordered={false}
        actions={getActions()}
      >
        <EpisodeCardHeader show={show} season={season} episode={episode}/>
        <EpisodeCardBody episode={episode}/>
      </Card>
    );
  };

  return displayCard();
};

export default EpisodeCard;