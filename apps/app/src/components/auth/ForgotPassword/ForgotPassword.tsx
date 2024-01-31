import { ForgotPasswordRequest } from '@scheduler/shared';
import { Button, Form, Input } from 'antd';

interface IForgotPasswordProps {
  handlePasswordReset: (values: ForgotPasswordRequest) => void;
  loading: boolean;
}
  
const ForgotPassword = (props: IForgotPasswordProps) => {
  const { handlePasswordReset, loading } = props;

  return (
    <Form
      name='basic'
      labelCol={{ span: 6 }}
      labelAlign='left'
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
      <Button block type='primary' htmlType='submit' loading={loading}>
        {!loading && 'Send Me A Recovery Link'}
      </Button>
    </Form>
  );
};

export default ForgotPassword;