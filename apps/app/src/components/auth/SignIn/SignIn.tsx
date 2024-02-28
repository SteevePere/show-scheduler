import { SignInRequest } from '@scheduler/shared';
import { Button, Form, Input } from 'antd';

interface SignInProps {
  signIn: (values: SignInRequest) => void;
  loading: boolean;
}
  
const SignIn = (props: SignInProps) => {
  const { signIn, loading } = props;

  return (
    <Form
      name='basic'
      initialValues={{ remember: true }}
      onFinish={signIn}
      autoComplete='off'
      labelCol={{ span: 6 }}
      labelAlign='left'
    >
      <Form.Item
        label='Email'
        name='email'
        rules={[
          { required: true, message: 'Please enter your username!' },
          {
            type: 'email',
            message: 'The input is not a valid e-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Button block type='primary' htmlType='submit' loading={loading}>
        {!loading && 'Sign In'}
      </Button>
    </Form>
          
  );
};
 
export default SignIn;