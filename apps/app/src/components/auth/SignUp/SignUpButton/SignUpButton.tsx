import {
  LoginOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './SignUpButton.css';

const SignUpButton = () => {
  return (
    <NavLink to='/sign-up'>
      <Button>
        <LoginOutlined/>
          Sign Up
      </Button>
    </NavLink>
  );
};
  
export default SignUpButton;