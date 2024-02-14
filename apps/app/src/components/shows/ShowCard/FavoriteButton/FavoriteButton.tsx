import {
  HeartFilled,
  HeartOutlined,
} from '@ant-design/icons';
import { CreateFavoriteRequest, RemoveFavoriteRequest, ShowObject } from '@scheduler/shared';
import { Button, Tooltip } from 'antd';
import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createFavorite, deleteFavorite } from 'store/favorites/favorites.thunks';
import { RootState } from 'store/store';

interface IFavoriteButtonProps {
  show: ShowObject;
}

export const FavoriteButton = (props: IFavoriteButtonProps) => {
  const { show } = props;
  const dispatch = useAppDispatch();
  const { loading: favoritesLoading } = useSelector((state: RootState) => state.favorites);

  const isUserFavorite = useMemo(() => {
    return !!show.isFavoritedByUser;
  }, [show]);

  const isLoading = useMemo(() => {
    return (!!favoritesLoading.showId || !!favoritesLoading.showExtId) && 
    (favoritesLoading.showExtId === show.externalId || favoritesLoading.showId === show.id);
  }, [show, favoritesLoading]);

  const saveFavorite = useCallback((values: CreateFavoriteRequest) => {
    dispatch(createFavorite(values));
  }, [dispatch, createFavorite]);

  const removeFavorite = useCallback((values: RemoveFavoriteRequest) => {
    dispatch(deleteFavorite(values));
  }, [dispatch, deleteFavorite]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    
    show.id && isUserFavorite ? removeFavorite({ showId: show.id })
      : saveFavorite({ showExternalId: show.externalId });
  }, [show, isUserFavorite, removeFavorite, saveFavorite]);
  
  return (
    <Tooltip
      title={isUserFavorite ? 'Remove from My Shows' : 'Add To My Shows'}
      placement='bottom'
    >
      <Button
        key='add_plus'
        icon={isUserFavorite ? <HeartFilled className='primary'/> : <HeartOutlined/>}
        onClick={handleClick}
        loading={isLoading}
      />
    </Tooltip>
  );
};