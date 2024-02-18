import { RegistrationRequest, UpdateUserRequest, UserObject } from '@scheduler/shared';
import { DatePicker, FormInstance, Input, Radio } from 'antd';
import moment from 'moment';

import { IFormInput } from '../../../models/form/form-input.interface';
import { MIN_PASSWORD_LENGTH } from '../../../models/password.model';
import Form from '../Form/Form';

type HandlerType = RegistrationRequest & UpdateUserRequest;

interface IUserFormProps {
  form?: FormInstance;
  user: UserObject | null;
  loading: boolean;
  disabled: boolean;
  fields?: string[] | undefined;
  success?: string | null;
  cta?: string | undefined;
  extraInputs?: IFormInput[] | undefined;
  handler: (values: HandlerType) => void;
}

const UserForm = (props: IUserFormProps) => {
  const {
    form,
    user,
    fields,
    loading,
    disabled,
    extraInputs = [],
    cta,
    success,
    handler
  } = props;

  const formInputs: IFormInput[] = [ // clean this up
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
      children: <DatePicker key='birthDatePicker' style={{ width: '100%' }}/>
    },
  ];

  return (
    <Form
      form={form}
      disabled={disabled}
      loading={loading}
      fields={fields}
      inputs={formInputs}
      extraInputs={extraInputs}
      cta={cta}
      isSubmitSuccess={success}
      handler={handler}
    />
  );
};

export default UserForm;