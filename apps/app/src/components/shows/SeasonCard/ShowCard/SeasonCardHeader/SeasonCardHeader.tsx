import { SeasonObject } from '@scheduler/shared';
import { Avatar, Card, Space } from 'antd';
import { DateTime } from 'luxon';

const { Meta } = Card;

interface IProps {
  season: SeasonObject;
  backgroundPosition: string;
};

const SeasonCardHeader = (props: IProps) => {
  const {
    season,
  } = props;

  const seasonDate = !!season.premiereDate
    && typeof season.premiereDate === 'string'
    && DateTime.fromISO(season.premiereDate).toFormat('yyyy');

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
              src={season.imageUrl || './user_logo.png'}
              size={80}
              shape='square'
            />
          }
        />
        <Space
          size={0}
          direction='vertical'
        >
          <h1 style={{ marginBottom: '-0.2em' }}>
            {season.name || `Season ${season.number}`}
          </h1>
          <p>
            {seasonDate}
          </p>
        </Space>
      </Space>
    </>
  );
};

export default SeasonCardHeader;
