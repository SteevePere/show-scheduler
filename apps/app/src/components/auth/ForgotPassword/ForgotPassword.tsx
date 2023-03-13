import { ForgotPasswordRequest } from '@scheduler/shared';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import React from 'react';

interface IForgotPasswordProps {
  handlePasswordReset: (values: ForgotPasswordRequest) => void;
  loading: boolean;
}
  
const ForgotPassword = (props: IForgotPasswordProps) => {
  const { handlePasswordReset, loading } = props;

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
            onFinish={handlePasswordReset}
            autoComplete='off'
          >
            <Form.Item
              label='Email'
              name='email'
              rules={[
                { required: true, message: 'Please input your email!' },
                {
                  type: 'email',
                  message: 'The input is not a valid e-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 12, span: 8 }}>
              <Button type='primary' htmlType='submit' loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};
  
  
export default ForgotPassword;