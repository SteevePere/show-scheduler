import {
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
  
const ForgotPasswordButton = () => {
  return (
    <NavLink to='/forgot-password'>
      <Button>
        <QuestionCircleOutlined/>
            Forgot your Password?
      </Button>
    </NavLink>
  );
};
    
export default ForgotPasswordButton;