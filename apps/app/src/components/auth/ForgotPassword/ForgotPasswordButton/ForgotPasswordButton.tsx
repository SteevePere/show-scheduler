import {
  LoginOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
  
const ForgotPasswordButton = () => {
  return (
    <NavLink to='/forgot-password'>
      <Button>
        <LoginOutlined/>
            Forgot your Password?
      </Button>
    </NavLink>
  );
};
    
export default ForgotPasswordButton;