import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { SIGN_IN_ROUTE } from 'routing/Router';

import { RootState } from '../../store/store';
import { AppLoader } from './AppLoader/AppLoader';

type ProtectedRouteProps = RouteProps;

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const {
    isLoggedIn,
    currentUser,
    loadingCurrentUser: isUserLoading
  } = useSelector((state: RootState) => state.auth);

  const isUserUnknown = useMemo(() => isLoggedIn && !currentUser, [isLoggedIn, currentUser]);
  const isUserSignedOut = useMemo(() => !isLoggedIn && !currentUser, [isLoggedIn, currentUser]);
  
  if (isUserUnknown || isUserLoading) {
    return <AppLoader/>;
  }

  if (isUserSignedOut) {
    return (
      <Redirect
        to={{
          pathname: SIGN_IN_ROUTE,
          state: { from: props.location },
        }}
      />
    );
  }

  return <Route {...props}/>;
};