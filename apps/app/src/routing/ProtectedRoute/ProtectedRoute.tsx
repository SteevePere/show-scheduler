import { Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import LoadingSpinner from '../../components/shared/LoadingSpinner/LoadingSpinner';
import { RootState } from '../../store/store';

type ProtectedRouteProps = RouteProps;

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { isLoggedIn, currentUser, loadingCurrentUser } = useSelector((state: RootState) => state.auth);
  
  if (loadingCurrentUser) {
    return (
      <Row justify='center' align='middle'>
        <LoadingSpinner size={'large'}/>
      </Row>
    );
  }

  if (!isLoggedIn && !currentUser) {
    return (
      <Redirect
        to={{
          pathname: '/sign-in',
          state: { from: props.location },
        }}
      />
    );
  }

  return <Route {...props} />;
};