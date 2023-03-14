import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter, Route, RouteProps, Switch
} from 'react-router-dom';

import LoadingSpinner from '../components/shared/LoadingSpinner/LoadingSpinner';
import { useAppDispatch } from '../hooks/use-app-dispatch.hook';
import { getCurrentUser } from '../store/auth/auth.thunks';
import { RootState } from '../store/store';
import { ForgotPasswordView } from '../views/Authentication/ForgotPasswordView';
import { SignInView } from '../views/Authentication/SignInView';
import { SignUpView } from '../views/Authentication/SignUpView';
import NotFound from './NotFound/NotFound';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import UserLayoutRoute from './UserLayoutRoute/UserLayoutRoute';

export const SIGN_IN_ROUTE = '/sign-in';
export const SIGN_UP_ROUTE = '/sign-up';
export const FORGOT_PASSWORD_ROUTE = '/forgot-password';
export const RESET_PASSWORD_ROUTE = '/reset-password';
export const POSTS_ROUTE = '/posts';

const routes: RouteProps[] = [
  {
    path: SIGN_IN_ROUTE,
    exact: true,
    component: SignInView,
  },
  {
    path: SIGN_UP_ROUTE,
    exact: true,
    component: SignUpView,
  },
  {
    path: FORGOT_PASSWORD_ROUTE,
    exact: true,
    component: ForgotPasswordView,
  },
  {
    path: RESET_PASSWORD_ROUTE,
    exact: true,
    component: ForgotPasswordView,
  },
];

const protectedRoutes: RouteProps[] = [
  {
	  path: POSTS_ROUTE,
	  exact: true,
	  component: LoadingSpinner,
  },
];

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
	  if (isLoggedIn) {
	    dispatch(getCurrentUser());
	  }
  }, [isLoggedIn, getCurrentUser]);

  return (
	  <BrowserRouter>
	    <Switch>
	      {routes.map(((route, index) => 
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />))}
	      <ProtectedRoute>
		  	  <Switch>
            {protectedRoutes.map(((route, index) => 
              <UserLayoutRoute
                key={index}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />))}
	        </Switch>
	      </ProtectedRoute>
	      <Route component={NotFound}/>
	    </Switch>
	  </BrowserRouter>
  );
};

export default AppRouter;  