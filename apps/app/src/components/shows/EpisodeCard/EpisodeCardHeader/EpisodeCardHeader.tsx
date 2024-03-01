import { EpisodeObject, SeasonObject, ShowObject } from '@scheduler/shared';
import { Avatar, Card, Space } from 'antd';
import { useMemo } from 'react';
import { formatDate } from 'utils/format-date.util';

const { Meta } = Card;

interface IEpisodeCardHeaderProps {
  show: ShowObject | null;
  season: SeasonObject;
  episode: EpisodeObject;
};

const defautEpisodeImage = process.env.PUBLIC_URL + '/user_logo.png';

const EpisodeCardHeader = (props: IEpisodeCardHeaderProps) => {
  const {
    show,
    season,
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

  const episodeImage = useMemo(
    () => episode.imageUrl || season.imageUrl || show?.imageUrl || defautEpisodeImage,
    [show?.imageUrl, season.imageUrl, episode.imageUrl]
  );
    
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
              src={episodeImage}
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
