
import { SignInRequest } from '@scheduler/shared';
import React from 'react';
import { useDispatch } from 'react-redux';

import SignIn from '../../components/auth/SignIn/SignIn';
import { signIn } from '../../store/auth/auth.thunks';
import store from '../../store/store';

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const SignInView = () => {
  const login = (values: SignInRequest) => {
    dispatch(signIn(values));
  };

  const dispatch = useAppDispatch();
    // let history = useHistory();
    // if (isAuthenticated()) {
    //   history.push('/v1');
    // }

  return (
    <>
      <SignIn signIn={login}/>
    </>
  );
};
