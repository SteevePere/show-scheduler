import { UpdateUserRequest } from '@scheduler/shared';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Profile from '../../components/profile/Profile';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { setSuccess } from '../../store/auth/auth.slice';
import { updateUser } from '../../store/auth/auth.thunks';
import { RootState } from '../../store/store';
import { openNotification } from '../../utils/notification.util';

export const ProfileView = () => {
  const dispatch = useAppDispatch();
  const { currentUser, error, success, loading } = useSelector((state: RootState) => state.auth);
  
  if (!currentUser) {
    return null;
  }

  useEffect(() => {
    dispatch(setSuccess(false));
  }, []);

  const [editing, setEditing] = useState<boolean>(false);

  const updateUserHandler = useCallback((values: UpdateUserRequest) => {
    dispatch(updateUser({
      id: currentUser.id || '',
      ...values,
    }));
  }, []);

  useEffect(() => {
    if (error) {
      setEditing(true);
      openNotification({
        type: 'error',
        message: 'Profile Update Failed',
        description: error || 'Something went wrong!'
      });
    }
    else if (success) {
      openNotification(
        {
          type: 'success',
          message: 'Profile Updated',
          description: 
            'Your profile is up-to-date!'
        }
      );
    }
  }, [success, error]);

  return (
    <Profile
      currentUser={currentUser}
      updateUser={updateUserHandler}
      loading={loading}
      editing={editing}
      setEditing={setEditing}
    />
  );
};
