import { EpisodeObject } from '@scheduler/shared';
import { Avatar, Card, Space } from 'antd';
import { useMemo } from 'react';
import { formatDate } from 'utils/format-date.util';

const { Meta } = Card;

interface IEpisodeCardHeaderProps {
  episode: EpisodeObject;
};

const EpisodeCardHeader = (props: IEpisodeCardHeaderProps) => {
  const {
    episode,
  } = props;

  const episodeName = useMemo(() => {
    if (episode.number && episode.name) {
      return `Episode ${episode.number} - ${episode.name}`;
    } else if (episode.number) {
      return `Episode ${episode.number}`;
    } else if (episode.name) {
      return episode.name;
    } else {
      return 'Untitled';
    }
  }, [episode.name, episode.number]);

  const episodeDate = useMemo(() => {
    return formatDate({ date: episode.airDate, format: 'dd/MM/yyyy' });
  }, [episode.airDate]);

  return (
    <>
      <Space
        size={1}
        style={{
          display: 'flex',
          marginBottom: 22,
          textAlign: 'left'
        }}
      >
        <Meta
          avatar={
            <Avatar
              src={episode.imageUrl || './user_logo.png'}
              size={60}
              shape='square'
            />
          }
        />
        <Space
          size={0}
          direction='vertical'
        >
          <h1 style={{ marginBottom: '-0.2em' }}>
            {episodeName}
          </h1>
          <p>
            {episodeDate}
          </p>
        </Space>
      </Space>
    </>
  );
};

export default EpisodeCardHeader;
