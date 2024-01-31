import {
  UndoOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

export const BackButton = () => {
  const history = useHistory();

  return (
    <Button
      onClick={() => history.goBack()}
    >
      <UndoOutlined/>
      Go Back
    </Button>
  );
};