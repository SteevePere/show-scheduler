import {
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { CreateFavoriteRequest, ShowObject } from '@scheduler/shared';
import { Card, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';

import ShowCardBody from './ShowCardBody/ShowCardBody';
import ShowCardHeader from './ShowCardHeader/ShowCardHeader';

interface IShowCardProps {
  show: ShowObject;
  saveFavorite: (data: CreateFavoriteRequest) => void;
  hideViewButton?: boolean;
};

const ShowCard = (props: IShowCardProps) => {
  const { show, saveFavorite, hideViewButton = false } = props;

  const ViewButton = () => {
    return (
      <Tooltip title='View Show' placement='bottom'>
        <NavLink
          to={'/show/' + show.externalId}
        >
          <EyeOutlined
            key='view_eye'
          />
        </NavLink>
      </Tooltip>
    );
  };

  const AddButton = () => {
    return (
      <Tooltip title='Add To My Shows' placement='bottom'>
        <PlusOutlined
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            saveFavorite({ showExternalId: show.externalId });
          }}
          key='add_plus'
        />
      </Tooltip>
    );
  };

  const getActions = () => {
    const actions = [
      <AddButton key='add'/>,
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
          flexDirection: 'column'
        }}
        bodyStyle={{
          flexGrow: '1'
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
