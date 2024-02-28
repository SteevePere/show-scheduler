import { Row } from 'antd';
import LoadingSpinner from 'components/shared/LoadingSpinner/LoadingSpinner';

export const AppLoader = () => {
  return (
    <Row justify='center' align='middle'>
      <LoadingSpinner size={'large'}/>
    </Row>
  );
};