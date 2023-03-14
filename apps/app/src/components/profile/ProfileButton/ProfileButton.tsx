import {
  LoginOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
    
const ProfileButton = () => {
  return (
    <NavLink to='/profile'>
      <Button>
        <LoginOutlined/>
          My Profile
      </Button>
    </NavLink>
  );
};
      
export default ProfileButton;