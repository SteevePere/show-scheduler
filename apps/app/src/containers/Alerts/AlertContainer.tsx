import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setUpdateUserSuccess, setUpdateUserError } from 'store/auth/auth.slice';
import { setFavoritesError, setFavoritesSuccess } from 'store/favorites/favorites.slice';
import { setShowsError, setShowsSuccess } from 'store/shows/shows.slice';
import { RootState } from 'store/store';
import { openNotification } from 'utils/notification.util';

interface AlertContainerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};
  
const AlertContainer = ({ children }: AlertContainerProps) => {
  const dispatch = useAppDispatch();

  const { updateUserError, updateUserSuccess } = useSelector((state: RootState) => state.auth);
  const { showsError, showsSuccess, epWatchedError, epWatchedSuccess  } = useSelector((state: RootState) => state.shows);
  const { favoritesError, favoritesSuccess } = useSelector((state: RootState) => state.favorites);

  useEffect(() => {
    if (updateUserSuccess) {
      openSuccessNotification(updateUserSuccess);
      dispatch(setUpdateUserSuccess(null));
    }
    else if (updateUserError) {
      openErrorNotification(updateUserError);
      dispatch(setUpdateUserError(null));
    }
  }, [updateUserSuccess, updateUserError]);

  useEffect(() => {
    const success = showsSuccess || epWatchedSuccess;
    const error = showsError || epWatchedError;
    
    if (success) {
      openSuccessNotification(success);
      dispatch(setShowsSuccess(null));
    }
    else if (error) {
      openErrorNotification(error);
      dispatch(setShowsError(null));
    }
  }, [showsSuccess, showsError, epWatchedSuccess, epWatchedError]);

  useEffect(() => {
    if (favoritesError) {
      openErrorNotification(favoritesError);
      dispatch(setFavoritesError(null));
    }
    else if (favoritesSuccess) {
      openSuccessNotification(favoritesSuccess);
      dispatch(setFavoritesSuccess(null));
    }
  }, [favoritesError, favoritesSuccess]);

  const openErrorNotification = useCallback((description: string) => {
    openNotification({ type: 'error', message: 'An Error Occured', description });
  }, [openNotification]);

  const openSuccessNotification = useCallback((description: string) => {
    openNotification({ type: 'success', message: 'Done!', description });
  }, [openNotification]);

  return (
    <>
      {children}
    </>
  );
};

export default AlertContainer;