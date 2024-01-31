import { ForgotPasswordRequest, ResetPasswordRequest } from '@scheduler/shared';
import BaseLayout from 'layout/BaseLayout/BaseLayout';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ForgotPassword from '../../components/auth/ForgotPassword/ForgotPassword';
import ResetPassword from '../../components/auth/ForgotPassword/ResetPassword';
import SignInButton from '../../components/auth/SignIn/SignInButton/SignInButton';
import { BackButton } from '../../components/shared/BackButton/BackButton';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { useQuery } from '../../hooks/use-query.hook';
import { FORGOT_PASSWORD_ROUTE } from '../../routing/Router';
import { requestPasswordReset, resetPassword } from '../../store/auth/auth.thunks';
import { RootState } from '../../store/store';
import { openNotification } from '../../utils/notification.util';

export const ForgotPasswordView = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const query = useQuery();

  const { loading, error, success } = useSelector((state: RootState) => state.auth);
  const isRequestToken = location.pathname === FORGOT_PASSWORD_ROUTE;
  
  const handlePasswordRequest = useCallback((values: ForgotPasswordRequest) => {
    dispatch(requestPasswordReset(values));
  }, []);

  const handlePasswordReset = useCallback((values: ResetPasswordRequest) => {
    dispatch(resetPassword({ ...values, token: query.get('token') || '' }));
  }, []);

  useEffect(() => {
    if (error) {
      openNotification({ type: 'error', message: 'Request Failed', description: 'Something went wrong!' });
    }
    else if (success) {
      openNotification(
        isRequestToken ? {
          type: 'success',
          message: 'Request Sent',
          description: 
            'An email will be sent to this email address if it exists in our database!',
          duration: 5,
        } : {
          type: 'success',
          message: 'Password Updated',
          description: 
            'Your password has been reset!',
          duration: 5,
        }
      );
    }
  }, [success, error]);

  return isRequestToken ? (
    <BaseLayout
      content={<ForgotPassword handlePasswordReset={handlePasswordRequest} loading={loading}/>}
      ctas={
        <BackButton/>
      }
    />
  ) : (
    <BaseLayout
      content={<ResetPassword handlePasswordReset={handlePasswordReset} loading={loading}/>}
      ctas={success ? <SignInButton/> : undefined}
    />
   
  );
};
