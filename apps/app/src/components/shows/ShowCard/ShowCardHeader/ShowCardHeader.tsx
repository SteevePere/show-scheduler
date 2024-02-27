import { ShowObject } from '@scheduler/shared';
import { Avatar, Card, Space } from 'antd';

const { Meta } = Card;

interface IProps {
  show: ShowObject;
  backgroundPosition: string;
};

const ShowCardHeader = (props: IProps) => {
  const {
    show,
  } = props;

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
              src={show.imageUrl || './user_logo.png'}
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
