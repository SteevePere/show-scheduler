import {
  UserAddOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

const SignUpButton = () => {
  return (
    <NavLink to='/sign-up'>
      <Button>
        <UserAddOutlined/>
          Sign Up
      </Button>
    </NavLink>
  );
};
  
export default SignUpButton;