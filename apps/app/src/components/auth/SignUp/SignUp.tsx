import { RegistrationRequest } from '@scheduler/shared';

import UserForm from '../../shared/UserForm/UserForm';
  
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