import {
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
} from '@ant-design/icons';
import { CreateFavoriteRequest, RemoveFavoriteRequest, ShowObject } from '@scheduler/shared';
import { Button, Card, Tooltip } from 'antd';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { FavoriteLoading } from 'store/favorites/favorites.model';

import ShowCardBody from './ShowCardBody/ShowCardBody';
import ShowCardHeader from './ShowCardHeader/ShowCardHeader';

interface IShowCardProps {
  show: ShowObject;
  saveFavorite: (data: CreateFavoriteRequest) => void;
  removeFavorite: (data: RemoveFavoriteRequest) => void;
  favoritesLoading: FavoriteLoading;
  hideViewButton?: boolean;
  showFullText?: boolean;
};

const ShowCard = (props: IShowCardProps) => {
  const { show, saveFavorite, removeFavorite, hideViewButton = false, favoritesLoading } = props;

  const isUserFavorite = useMemo(() => {
    return show.isFavoritedByUser;
  }, [show.isFavoritedByUser]);

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

  const AddButton = () => {
    return (
      <Tooltip title={isUserFavorite ? 'Remove from My Shows' : 'Add To My Shows'} placement='bottom'>
        <Button
          key='add_plus'
          icon={isUserFavorite ? <HeartFilled className='primary'/> : <HeartOutlined/>}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            show.id && isUserFavorite ? removeFavorite({ showId: show.id })
              : saveFavorite({ showExternalId: show.externalId });
          }}
          loading={(!!favoritesLoading.showId || !!favoritesLoading.showExtId) && 
            (favoritesLoading.showExtId === show.externalId || favoritesLoading.showId === show.id)}
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
