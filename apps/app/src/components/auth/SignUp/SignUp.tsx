import { RegistrationRequest } from '@scheduler/shared';
import { Button, Card, Col, DatePicker, Form, Input, Radio, Row } from 'antd';
import React from 'react';

import { IFormInput } from '../../../models/form/form-input.interface';
  
import './SignUp.css';

interface ISignUpProps {
  signUp: (values: RegistrationRequest) => void;
  loading: boolean;
}

const MIN_PASSWORD_LENGTH = 6;
  
const SignUp = (props: ISignUpProps) => {
  const { signUp, loading } = props;

  const formInputs: IFormInput[] = [
    {
      key: 'firstNameInput',
      label: 'First Name',
      name: 'firstName',
      rules: [{ required: true, message: 'Please input your first name!'}],
      children: <Input key='firstNameInput'/>
    },
    {
      key: 'lastNameInput',
      label: 'Last Name',
      name: 'lastName',
      rules: [{ required: true, message: 'Please input your last name!' }],
      children: <Input key='lastNameInput'/>
    },
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
      label: 'Password',
      name: 'password',
      rules: [
        { required: true, message: 'Please input your password!' },
        { type: 'string', min: MIN_PASSWORD_LENGTH, message: 'Password is too short!' },
      ],
      children: <Input.Password key='passwordInput'/>
    },
    {
      key: 'passwordConfirmInput',
      label: 'Confirm Password',
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
    {
      key: 'genderInput',
      label: 'Gender',
      name: 'gender',
      valuePropName: 'checked',
      rules: [{ required: true, message: 'Please choose a gender!' }],
      children: <Radio.Group>
        <Radio key='MALE' value='MALE'>Male</Radio>
        <Radio key='FEMALE'value='FEMALE'>Female</Radio>
      </Radio.Group>
    },
    {
      key: 'birthDateInput',
      label: 'Birth Date',
      name: 'birthDate',
      rules: [{ required: true, message: 'Please input your birth date!' }],
      children: <DatePicker key='birthDatePicker'/>
    },
  ];

  return (
    <Card
      id='sign-up'
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
            onFinish={signUp}
            autoComplete='on'
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
  
  
export default SignUp;