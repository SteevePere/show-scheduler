import { RegistrationRequest, UpdateUserRequest, UserObject } from '@scheduler/shared';
import { DatePicker, FormInstance, Input, Radio } from 'antd';
import { UserFormField } from 'models/form/user-form-field.type';
import moment from 'moment';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { IFormInput } from '../../../models/form/form-input.interface';
import { MIN_PASSWORD_LENGTH } from '../../../models/password.model';
import Form from '../Form/Form';

type HandlerType = RegistrationRequest & UpdateUserRequest;

interface IUserFormProps {
  form?: FormInstance;
  user: UserObject | null;
  loading: boolean;
  disabled: boolean;
  fields: UserFormField[];
  success?: string | null;
  cta?: string | undefined;
  handler: (values: HandlerType) => void;
}

const UserForm = (props: IUserFormProps) => {
  const {
    user,
    disabled,
    success,
  } = props;

  const [passwordFilled, setPasswordFilled] = useState<boolean>(false);

  useEffect(() => {
    if (disabled && passwordFilled) setPasswordFilled(false);
  }, [disabled]);

  const onPasswordChange = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    setPasswordFilled(!!value?.target?.value?.length);
  }, []);

  const formInputs: IFormInput[] = [
    {
      key: 'firstNameInput',
      label: 'First Name',
      name: 'firstName',
      initialValue: user?.firstName,
      rules: [{ required: true, message: 'Please enter your first name!'}],
      children: <Input key='firstNameInput'/>
    },
    {
      key: 'lastNameInput',
      label: 'Last Name',
      name: 'lastName',
      initialValue: user?.lastName,
      rules: [{ required: true, message: 'Please enter your last name!' }],
      children: <Input key='lastNameInput'/>
    },
    {
      key: 'emailInput',
      label: 'Email',
      name: 'email',
      initialValue: user?.email,
      rules: [
        { required: true, message: 'Please enter your email!' },
        {
          type: 'email',
          message: 'This is not a valid e-mail!',
        },
      ],
      children: <Input key='emailInput'/>
    },
    {
      key: 'passwordInput',
      label: 'Password',
      name: 'password',
      rules: [
        { required: true, message: 'Please enter your password!' },
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
        { type: 'string', min: MIN_PASSWORD_LENGTH, message: 'Password is too short!' },
        { required: true, message: 'Please confirm your password!' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
          },
        }),
      ],
      children: <Input.Password key='passwordConfirmInput'/>
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
      rules: [{ required: true, message: 'Please enter your birth date!' }],
      children: <DatePicker key='birthDateInput' style={{ width: '100%' }}/>
    },
    {
      key: 'optionalPasswordInput',
      label: 'New Password',
      name: 'password',
      rules: [
        { type: 'string', min: MIN_PASSWORD_LENGTH, message: 'Password is too short!' },
      ],
      children: <Input.Password onChange={onPasswordChange} key='optionalPasswordInput'/>,
    },
    {
      key: 'optionalPasswordConfirmInput',
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
      children: <Input.Password key='optionalPasswordConfirmInput'/>,
    },
    {
      key: 'oldPasswordInput',
      label: 'Current Password',
      name: 'oldPassword',
      dependencies: ['password'],
      rules: [
        { type: 'string', min: MIN_PASSWORD_LENGTH, message: 'Password is too short!' },
        { required: passwordFilled, message: 'Please enter your current password!' },
      ],
      children: <Input.Password key='oldPasswordInput'/>,
    },
  ];

  return (
    <Form
      {...props}
      inputs={formInputs}
      isSubmitSuccess={success}
    />
  );
};

export default UserForm;