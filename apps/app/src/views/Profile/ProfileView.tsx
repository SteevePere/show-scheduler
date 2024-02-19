import { UpdateUserRequest } from '@scheduler/shared';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Profile from '../../components/profile/Profile';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { updateUser } from '../../store/auth/auth.thunks';
import { RootState } from '../../store/store';

export const ProfileView = () => {
  const dispatch = useAppDispatch();
  const { currentUser, loading, updateUserSuccess } = useSelector((state: RootState) => state.auth);
  
  if (!currentUser) {
    return null;
  }

  const updateUserHandler = useCallback((values: UpdateUserRequest) => {
    dispatch(updateUser({
      id: currentUser.id || '',
      ...values,
    }));
  }, []);

  return (
    <Profile
      currentUser={currentUser}
      success={updateUserSuccess}
      updateUser={updateUserHandler}
      loading={loading}
    />
  );
};
