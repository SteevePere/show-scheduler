import { RegistrationRequest, UpdateUserRequest, UserObject } from '@scheduler/shared';
import { Button, Card, Col, DatePicker, Form, FormInstance, Input, Radio, Row } from 'antd';
import moment from 'moment';
import React from 'react';

import { IFormInput } from '../../../models/form/form-input.interface';
import { MIN_PASSWORD_LENGTH } from '../../../models/password.model';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
  
type HandlerType = RegistrationRequest & UpdateUserRequest;

interface IUserFormProps {
  form?: FormInstance;
  user: UserObject | null;
  loading: boolean;
  disabled: boolean;
  handler: (values: HandlerType) => void;
  fields?: string[] | undefined;
  extraInputs?: IFormInput[] | undefined;
}

const UserForm = (props: IUserFormProps) => {
  const { form, user, fields, loading, disabled, extraInputs = [], handler } = props;

  const formInputs: IFormInput[] = [
    {
      key: 'firstNameInput',
      label: 'First Name',
      name: 'firstName',
      initialValue: user?.firstName,
      rules: [{ required: true, message: 'Please input your first name!'}],
      children: <Input key='firstNameInput'/>
    },
    {
      key: 'lastNameInput',
      label: 'Last Name',
      name: 'lastName',
      initialValue: user?.lastName,
      rules: [{ required: true, message: 'Please input your last name!' }],
      children: <Input key='lastNameInput'/>
    },
    {
      key: 'emailInput',
      label: 'Email',
      name: 'email',
      initialValue: user?.email,
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
      initialValue: user?.gender,
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
      initialValue: user ? moment(user?.birthDate) : undefined,
      rules: [{ required: true, message: 'Please input your birth date!' }],
      children: <DatePicker key='birthDatePicker'/>
    },
  ];

  const renderFields = () => {
    const getFormItem = (input: IFormInput) => {
      return (<Form.Item
        key={input.key}
        label={input.label}
        name={input.name}
        initialValue={input.initialValue}
        rules={input.rules}
      >
        {input.children}
      </Form.Item>); 
    };

    const fieldsToRender = formInputs.map((input) => {
      if (fields && fields.includes(input.name) || !fields) {
        return getFormItem(input);
      }
      return null;
    });

    return fieldsToRender.concat(extraInputs.map((input) => getFormItem(input)));
  };

  return (
    <Card
      id='user-form-card'
      bordered={false}
    >
      <Row
        gutter={[24, 24]}
      >
        <Col span={8} offset={8}>
          <Form
            form={form}
            name='basic'
            labelCol={{ span: 6 }}
            initialValues={{ remember: true }}
            onFinish={handler}
            autoComplete='on'
            disabled={disabled}
          >
            {loading ? <LoadingSpinner/> : renderFields()}
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

export default UserForm;