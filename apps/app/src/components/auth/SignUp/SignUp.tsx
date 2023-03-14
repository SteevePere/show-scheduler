import { RegistrationRequest } from '@scheduler/shared';
import React from 'react';

import UserForm from '../../shared/UserForm/UserForm';
  
import './SignUp.css';

interface ISignUpProps {
  signUp: (values: RegistrationRequest) => void;
  loading: boolean;
}

const SignUp = (props: ISignUpProps) => {
  const { signUp, loading } = props;

  return (
    <UserForm
      user={null}
      loading={loading}
      disabled={false}
      handler={signUp}
    />
  );
};
  
  
export default SignUp;