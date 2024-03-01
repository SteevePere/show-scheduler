import { ShowObject } from '@scheduler/shared';
import { Avatar, Card, Space } from 'antd';
import { useMemo } from 'react';

const { Meta } = Card;

interface IProps {
  show: ShowObject;
  backgroundPosition: string;
};

const defautShowImage = process.env.PUBLIC_URL + '/user_logo.png';

const ShowCardHeader = (props: IProps) => {
  const {
    show,
  } = props;

  const showImage = useMemo(() => show?.imageUrl || defautShowImage, [show.imageUrl]);

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
              src={showImage}
              size={100}
              shape='square'
            />
          }
        />
        <h1>
          {show.name}
        </h1>
      </Space>
    </>
  );
};

export default ShowCardHeader;
