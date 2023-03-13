import { ForgotPasswordRequest } from '@scheduler/shared';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ForgotPassword from '../../components/auth/ForgotPassword/ForgotPassword';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { requestPasswordReset } from '../../store/auth/auth.thunks';
import { RootState } from '../../store/store';
import { openNotification } from '../../utils/notification.util';

export const ForgotPasswordView = () => {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useSelector((state: RootState) => state.auth);

  const handlePasswordReset = useCallback((values: ForgotPasswordRequest) => {
    dispatch(requestPasswordReset(values));
  }, []);

  useEffect(() => {
    if (error) {
      openNotification({ type: 'error', message: 'Request Failed', description: 'Something went wrong!' });
    }
    else if (success) {
      openNotification({ type: 'success', message: 'Request Sent', description: 'An email will be sent to this email address if it exists in our database!' });
    }
  }, [success, error]);
  
  return (
    <>
      <ForgotPassword handlePasswordReset={handlePasswordReset} loading={loading}/>
    </>
  );
};
