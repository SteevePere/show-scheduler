import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const BackButton = () => {
  const history = useHistory();
  return (
    <Button onClick={() => history.goBack()}>Back</Button>
  );
};