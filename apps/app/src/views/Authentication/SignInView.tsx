
import { SignInRequest } from '@scheduler/shared';
import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import SignIn from '../../components/auth/SignIn/SignIn';
import { routingConfig } from '../../config/routing.config';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { useCurrentUser } from '../../hooks/use-current-user.hook';
import { useFromLocation } from '../../hooks/use-from-location.hook';
import { signIn } from '../../store/auth/auth.thunks';

export const SignInView = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const from = useFromLocation();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      history.push(from || routingConfig.home);
    }
  }, [currentUser, history, from]);

  const login = useCallback((values: SignInRequest) => {
    dispatch(signIn(values));
  }, []);
  
  return (
    <SignIn signIn={login}/>
  );
};
