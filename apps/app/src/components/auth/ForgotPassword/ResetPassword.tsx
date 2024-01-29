import { ResetPasswordRequest } from '@scheduler/shared';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { IFormInput } from 'models/form/form-input.interface';

import { MIN_PASSWORD_LENGTH } from '../../../models/password.model';

interface IResetPasswordProps {
  handlePasswordReset: (values: ResetPasswordRequest) => void;
  loading: boolean;
}
  
const ForgotPassword = (props: IResetPasswordProps) => {
  const { handlePasswordReset, loading } = props;

  const formInputs: IFormInput[] = [
    {
      key: 'emailInput',
      label: 'Email',
      name: 'email',
      rules: [
        { required: true, message: 'Please input your email!' },
        {
          type: 'email',
          message: 'The input is not a valid e-mail!',
        },
      ],
      children: <Input key='emailInput'/>
    },
    {
      key: 'passwordInput',
      label: 'New Password',
      name: 'password',
      rules: [
        { required: true, message: 'Please input your password!' },
        { type: 'string', min: MIN_PASSWORD_LENGTH, message: 'Password is too short!' },
      ],
      children: <Input.Password key='passwordInput'/>
    },
    {
      key: 'passwordConfirmInput',
      label: 'Confirm New Password',
      name: 'passwordConfirm',
      dependencies: ['password'],
      rules: [
        {
          type: 'string',
          required: true,
          min: MIN_PASSWORD_LENGTH,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
          },
        }),
      ],
      children: <Input.Password key='passwordConfirm'/>
    },
  ];

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
            {formInputs.map((input) => (
              <Form.Item
                key={input.key}
                label={input.label}
                name={input.name}
                rules={input.rules}
              >
                {input.children}
              </Form.Item>
            ))}
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