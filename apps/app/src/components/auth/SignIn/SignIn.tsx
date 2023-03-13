import { SignInRequest } from '@scheduler/shared';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import React from 'react';

import SignUpButton from '../SignUp/SignUpButton/SignUpButton';
  
import './SignIn.css';

interface SignInProps {
  signIn: (values: SignInRequest) => void;
  loading: boolean;
}
  
const SignIn = (props: SignInProps) => {
  const { signIn, loading } = props;

  return (
    <Card
      id='sign-in'
      bordered={false}
    >
      <Row
        gutter={[24, 24]}
      >
        <Col span={8} offset={8}>
          <Form
            name='basic'
            labelCol={{ span: 6 }}
            initialValues={{ remember: true }}
            onFinish={signIn}
            autoComplete='off'
          >
            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 12, span: 8 }}>
              <Button type='primary' htmlType='submit' loading={loading}>
                Submit
              </Button>
            </Form.Item>
            <SignUpButton/>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};
  
  
export default SignIn;