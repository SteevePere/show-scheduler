import { UpdateUserRequest, UserObject } from '@scheduler/shared';
import { Button, Input } from 'antd';
import React, { ChangeEvent, useCallback, useState } from 'react';

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

  const handleCancel = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

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
      label: 'Confirm New Password',
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
    <>
      <UserForm
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
      <Button type='primary' onClick={() => handleCancel()}>
        {editing  ? 'Cancel' : 'Edit'}
      </Button>
    </>
  );
};
        
export default Profile;