import {
  LoginOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

interface ISignInButtonProps {
  text?: string;
}

const SignInButton = (props: ISignInButtonProps) => {
  const { text = 'Sign In' } = props;
  
  return (
    <NavLink to='/sign-in'>
      <Button>
        <LoginOutlined/>
        { text }
      </Button>
    </NavLink>
  );
};
  
export default SignInButton;