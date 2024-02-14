import {
  EyeOutlined
} from '@ant-design/icons';
import { ShowObject } from '@scheduler/shared';
import { Button, Card, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';

import { FavoriteButton } from './FavoriteButton/FavoriteButton';
import ShowCardBody from './ShowCardBody/ShowCardBody';
import ShowCardHeader from './ShowCardHeader/ShowCardHeader';

interface IShowCardProps {
  show: ShowObject;
  hideViewButton?: boolean;
  showFullText?: boolean;
};

const ShowCard = (props: IShowCardProps) => {
  const { show, hideViewButton = false } = props;

  const ViewButton = () => {
    return (
      <Tooltip title='View Show' placement='bottom'>
        <NavLink
          to={'/show/' + show.externalId}
        >
          <Button
            key='view_eye'
            icon={<EyeOutlined/>}
          />
        </NavLink>
      </Tooltip>
    );
  };

  const getActions = () => {
    const actions = [
      <FavoriteButton key='fav_button' show={show}/>,
    ];

    if (!hideViewButton) {
      actions.push(<ViewButton key='view'/>);
    }

    return actions;
  };

  const displayCard = () => {
    return (
      <Card
        hoverable={!hideViewButton}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        bodyStyle={{
          flexGrow: '1',
        }}
        actions={getActions()}
      >
        <ShowCardHeader
          {...props}
          backgroundPosition='0 -70px'
        />
        <ShowCardBody
          {...props}
        />
      </Card>
    );
  };

  return hideViewButton ? (displayCard()) : (
    <NavLink
      to={{
        pathname: '/show/' + show.externalId,
        state: { show: show },
      }}
    >
      {displayCard()}
    </NavLink>
  );
};

export default ShowCard;
