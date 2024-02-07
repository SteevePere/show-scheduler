import { RegistrationRequest } from '@scheduler/shared';
import BaseLayout from 'layout/BaseLayout/BaseLayout';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SignInButton from '../../components/auth/SignIn/SignInButton/SignInButton';
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
  const { loading, signUpError, currentUser } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (currentUser) {
      history.push(from || routingConfig.home);
    }
  }, [currentUser, history, from]);

  useEffect(() => {
    if (signUpError) {
      openNotification({ type: 'error', message: 'Registration Failed', description: signUpError });
    }
  }, [signUpError]);

  const register = useCallback((values: RegistrationRequest) => {
    dispatch(signUp(values));
  }, []);
  
  return (
    <BaseLayout
      content={<SignUp signUp={register} loading={loading}/>}
      ctas={
        <SignInButton text='Sign In Instead'/>
      }
    />
  );
};
