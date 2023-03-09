import {
  LoginOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './SignInButton.css';

const SignInButton = () => {
  return (
    <NavLink to='/sign-in'>
      <Button>
        <LoginOutlined/>
          Sign In
      </Button>
    </NavLink>
  );
};
  
export default SignInButton;