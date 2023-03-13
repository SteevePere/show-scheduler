import { SignInRequest } from '@scheduler/shared';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SignIn from '../../components/auth/SignIn/SignIn';
import { routingConfig } from '../../config/routing.config';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { useFromLocation } from '../../hooks/use-from-location.hook';
import { signIn } from '../../store/auth/auth.thunks';
import { RootState } from '../../store/store';
import { openNotification } from '../../utils/notification.util';

export const SignInView = () => {
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
      openNotification({ type: 'error', message: 'Authentication Failed', description: 'Wrong email or password!' });
    }
  }, [error]);

  const login = useCallback((values: SignInRequest) => {
    dispatch(signIn(values));
  }, []);
  
  return (
    <SignIn signIn={login} loading={loading}/>
  );
};
