import {
  LogoutOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { useCallback } from 'react';

import { useAppDispatch } from '../../../../hooks/use-app-dispatch.hook';
import { signOut } from '../../../../store/auth/auth.thunks';

const SignOutButton = () => {
  const dispatch = useAppDispatch();
  
  const handleLogout = useCallback(() => {
    dispatch(signOut());
  }, []);

  return (
    <Button type='link' onClick={handleLogout}>
      <LogoutOutlined/>
        Sign Out
    </Button>
  );
};

export default SignOutButton;
