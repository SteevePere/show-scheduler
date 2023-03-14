import { UpdateUserRequest, UserObject } from '@scheduler/shared';
import { Button } from 'antd';
import React, { useCallback, useState } from 'react';

import UserForm from '../shared/UserForm/UserForm';

interface IProfileProps {
  currentUser: UserObject | null;
  loading: boolean;
  updateUser: (values: UpdateUserRequest) => void;
};

const Profile = (props: IProfileProps) => {
  const { currentUser, loading, updateUser } = props;
  const [editing, setEditing] = useState<boolean>(false);

  const handleCancel = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  if (!currentUser) return null;

  return (
    <>
      <UserForm
        user={currentUser}
        loading={loading}
        disabled={!editing}
        fields={['email', 'firstName', 'lastName', 'birthDate', 'gender']}
        handler={updateUser}
      />
      <Button type='primary' onClick={() => handleCancel()}>
        {editing  ? 'Cancel' : 'Edit'}
      </Button>
    </>
  );
};
        
export default Profile;