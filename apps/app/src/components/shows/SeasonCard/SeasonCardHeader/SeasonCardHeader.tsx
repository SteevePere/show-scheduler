import { SeasonObject, ShowObject } from '@scheduler/shared';
import { Avatar, Card, Space } from 'antd';
import { useMemo } from 'react';
import { formatDate } from 'utils/format-date.util';

const { Meta } = Card;

interface IProps {
  show: ShowObject | null;
  season: SeasonObject;
  backgroundPosition: string;
};

const SeasonCardHeader = (props: IProps) => {
  const {
    show,
    season,
  } = props;

  const seasonDate = useMemo(() => {
    return formatDate({ date: season.premiereDate, format: 'yyyy' });
  }, [season.premiereDate]);

  const seasonImage = useMemo(
    () => season.imageUrl || show?.imageUrl || './user_logo.png',
    [show, season]
  );

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
              src={seasonImage}
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
