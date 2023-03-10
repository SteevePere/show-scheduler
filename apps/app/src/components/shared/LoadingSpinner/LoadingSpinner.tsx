import { LoadingOutlined } from '@ant-design/icons';
import { Row, Spin, SpinProps } from 'antd';
import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps extends SpinProps {
  marginTop?: number;
}

const spinner = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const LoadingSpinner = (props: LoadingSpinnerProps) => (
  <div className='spinner-container'>
    <Row justify='center'>
      <Spin indicator={spinner} size={props.size}/>
    </Row>
  </div>
);

export default LoadingSpinner;