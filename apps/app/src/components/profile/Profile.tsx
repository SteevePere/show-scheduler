import {
  UserOutlined
} from '@ant-design/icons';
import { UpdateUserRequest, UserObject } from '@scheduler/shared';
import { Button, Col, Divider, Form, Input, Row, Space } from 'antd';
import { ChangeEvent, useCallback, useState } from 'react';

import { IFormInput } from '../../models/form/form-input.interface';
import { MIN_PASSWORD_LENGTH } from '../../models/password.model';
import UserForm from '../shared/UserForm/UserForm';

interface IProfileProps {
  currentUser: UserObject | null;
  loading: boolean;
  editing: boolean;
  updateUser: (values: UpdateUserRequest) => void;
  setEditing: (editing: boolean) => void;
};

const Profile = (props: IProfileProps) => {
  const { currentUser, loading, editing, setEditing, updateUser } = props;
  const [passwordFilled, setPasswordFilled] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleCancel = useCallback(() => {
    setEditing(!editing);
    if (form) {
      form.resetFields();
    }
  }, [editing, form]);

  if (!currentUser) return null;

  const onPasswordChange = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    setPasswordFilled(!!value?.target?.value?.length);
  }, []);

  const extraInputs: IFormInput[] = [
    {
      key: 'passwordInput',
      label: 'New Password',
      name: 'password',
      rules: [
        { type: 'string', min: MIN_PASSWORD_LENGTH, message: 'Password is too short!' },
      ],
      children: <Input.Password onChange={onPasswordChange} key='passwordInput'/>,
    },
    {
      key: 'passwordConfirmInput',
      label: 'Confirm Password',
      name: 'passwordConfirm',
      dependencies: ['password'],
      rules: [
        { type: 'string', min: MIN_PASSWORD_LENGTH, message: 'Password is too short!' },
        { required: passwordFilled, message: 'Please confirm your password!' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you have entered do not match!'));
          },
        }),
      ],
      children: <Input.Password key='passwordConfirm'/>,
    },
    {
      key: 'oldPasswordInput',
      label: 'Current Password',
      name: 'oldPassword',
      dependencies: ['password'],
      rules: [
        { type: 'string', min: MIN_PASSWORD_LENGTH, message: 'Password is too short!' },
        { required: passwordFilled, message: 'Please input your current password!' },
      ],
      children: <Input.Password key='oldPassword'/>,
    },
  ];

  return (
    <Row align='middle' justify='center'>
      <Col span={22} md={{ span: 16 }} xl={{ span: 12 }}>
        <h1>
          <Space>
            <UserOutlined/>
            My Profile
          </Space>
        </h1>
        <Divider/>
        <UserForm
          form={form}
          user={currentUser}
          loading={loading}
          disabled={!editing}
          fields={[
            'email',
            'firstName',
            'lastName',
            'birthDate',
            'gender',
          ]}
          extraInputs={extraInputs}
          handler={updateUser}
        />
        <Divider/>
        <Button block type='primary' onClick={handleCancel}>
          {editing  ? 'Cancel' : 'Edit'}
        </Button>
      </Col>
    </Row>
  );
};
        
export default Profile;