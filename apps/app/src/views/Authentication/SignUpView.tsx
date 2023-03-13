import { RegistrationRequest } from '@scheduler/shared';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SignUp from '../../components/auth/SignUp/SignUp';
import { routingConfig } from '../../config/routing.config';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { useFromLocation } from '../../hooks/use-from-location.hook';
import { signUp } from '../../store/auth/auth.thunks';
import { RootState } from '../../store/store';
import { openNotification } from '../../utils/notification.util';

export const SignUpView = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const from = useFromLocation();
  const { loading, error, currentUser } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (currentUser) {
      history.push(from || routingConfig.home);
    }
  }, [currentUser, history, from]);

  useEffect(() => {
    if (error) {
      openNotification({ type: 'error', message: 'Registration Failed', description: error });
    }
  }, [error]);

  const register = useCallback((values: RegistrationRequest) => {
    dispatch(signUp(values));
  }, []);
  
  return (
    <SignUp signUp={register} loading={loading}/>
  );
};
