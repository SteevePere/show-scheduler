import { RegistrationRequest } from '@scheduler/shared';

import UserForm from '../../shared/UserForm/UserForm';
  
interface ISignUpProps {
  signUp: (values: RegistrationRequest) => void;
  loading: boolean;
  signUpSuccess?: string | null;
}

const SignUp = (props: ISignUpProps) => {
  const { signUp, loading, signUpSuccess } = props;

  return (
    <UserForm
      user={null}
      loading={loading}
      disabled={false}
      fields={[
        'emailInput',
        'firstNameInput',
        'lastNameInput',
        'birthDateInput',
        'genderInput',
        'passwordInput',
        'passwordConfirmInput',
      ]}
      cta='Sign Up'
      success={signUpSuccess}
      handler={signUp}
    />
  );
};

export default SignUp;