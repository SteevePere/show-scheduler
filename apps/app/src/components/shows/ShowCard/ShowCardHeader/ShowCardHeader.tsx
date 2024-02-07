import { ShowObject } from '@scheduler/shared';
import { Avatar, Card, Divider, Space } from 'antd';

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
        style={{
          float: 'left',
        }}
      >
        <Meta
          avatar={
            <Avatar
              src={show.imageUrl}
              size='large'
            />
          }
          style={{ float: 'left' }}
        />
        <h3>
          {show.name}
        </h3>
      </Space>
      <Divider style={{ marginTop: 50, marginBottom: 15 }}/>
    </>
  );
};

export default ShowCardHeader;
