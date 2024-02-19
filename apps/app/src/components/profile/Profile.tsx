import {
  UserOutlined
} from '@ant-design/icons';
import { UpdateUserRequest, UserObject } from '@scheduler/shared';
import { Button, Col, Divider, Form, Row, Space } from 'antd';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';

import UserForm from '../shared/UserForm/UserForm';

interface IProfileProps {
  currentUser: UserObject | null;
  loading: boolean;
  success?: string | null;
  updateUser: (values: UpdateUserRequest) => void;
};

const Profile = (props: IProfileProps) => {
  const { currentUser, loading, success, updateUser } = props;
  const [form] = Form.useForm();

  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (success && form) {
      setEditing(false);
      form.resetFields();
    }
  }, [success, form]);

  const handleUpdate = useCallback((values: UpdateUserRequest) => {
    updateUser(values);
  }, [editing, updateUser]);

  const handleToggleForm = useCallback(() => {
    if (form) {
      setEditing(!editing);
      form.resetFields();
    }
  }, [editing, form]);

  if (!currentUser) return null;

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
            'emailInput',
            'firstNameInput',
            'lastNameInput',
            'birthDateInput',
            'genderInput',
            'optionalPasswordInput',
            'optionalPasswordConfirmInput',
            'oldPasswordInput',
          ]}
          cta='Update my profile'
          success={success}
          handler={handleUpdate}
        />
        <Divider/>
        <Button block type='primary' onClick={handleToggleForm}>
          {editing  ? 'Cancel' : 'Edit'}
        </Button>
      </Col>
    </Row>
  );
};
        
export default Profile;