import { LoadingOutlined } from '@ant-design/icons';
import { Row, Spin, SpinProps } from 'antd';
import './LoadingSpinner.css';

interface LoadingSpinnerProps extends SpinProps {
  marginTop?: string;
}

const spinner = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { marginTop = '50vh', size } = props;

  return (
    <div className='spinner-container' style={{ marginTop: marginTop }}>
      <Row justify='center'>
        <Spin indicator={spinner} size={size}/>
      </Row>
    </div>
  );
};

export default LoadingSpinner;