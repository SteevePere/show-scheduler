import { EpisodeObject } from '@scheduler/shared';
import { Card } from 'antd';

import EpisodeCardBody from './EpisodeCardBody/EpisodeCardBody';
import EpisodeCardHeader from './EpisodeCardHeader/EpisodeCardHeader';

interface IEpisodeCardProps {
  episode: EpisodeObject;
};

const EpisodeCard = (props: IEpisodeCardProps) => {
  const { episode } = props;

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
      >
        <EpisodeCardHeader episode={episode}/>
        <EpisodeCardBody episode={episode}/>
      </Card>
    );
  };

  return displayCard();
};

export default EpisodeCard;