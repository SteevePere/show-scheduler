import {
  UserOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
    
const ProfileButton = () => {
  return (
    <NavLink to='/profile'>
      <Button>
        <UserOutlined/>
        My Profile
      </Button>
    </NavLink>
  );
};
      
export default ProfileButton;