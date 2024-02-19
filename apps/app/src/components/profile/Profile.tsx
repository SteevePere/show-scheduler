import {
  UserOutlined
} from '@ant-design/icons';
import { UpdateUserRequest, UserObject } from '@scheduler/shared';
import { Button, Col, Divider, Form, Row, Space } from 'antd';
import { useCallback } from 'react';
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

  const handleUpdate = useCallback((values: UpdateUserRequest) => {
    setEditing(false);
    updateUser(values);
  }, [editing, updateUser]);

  const handleCancel = useCallback(() => {
    setEditing(!editing);
    if (form) {
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
        <Button block type='primary' onClick={handleCancel}>
          {editing  ? 'Cancel' : 'Edit'}
        </Button>
      </Col>
    </Row>
  );
};
        
export default Profile;