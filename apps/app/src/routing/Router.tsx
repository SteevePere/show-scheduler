import AlertContainer from 'containers/Alerts/AlertContainer';
import { useAppDispatch } from 'hooks/use-app-dispatch.hook';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter, Redirect, Route, RouteProps, Switch
} from 'react-router-dom';
import { getCurrentUser } from 'store/auth/auth.thunks';
import { RootState } from 'store/store';
import { ForgotPasswordView } from 'views/Authentication/ForgotPasswordView';
import { SignInView } from 'views/Authentication/SignInView';
import { SignUpView } from 'views/Authentication/SignUpView';
import { ProfileView } from 'views/Profile/ProfileView';
import { SearchView } from 'views/Shows/SearchView';
import { ShowView } from 'views/Shows/ShowView';

import NotFound from './NotFound/NotFound';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import UserLayoutRoute from './UserLayoutRoute/UserLayoutRoute';

export const HOME_ROUTE = '/';
export const SIGN_IN_ROUTE = '/sign-in';
export const SIGN_UP_ROUTE = '/sign-up';
export const FORGOT_PASSWORD_ROUTE = '/forgot-password';
export const RESET_PASSWORD_ROUTE = '/reset-password';
export const PROFILE_ROUTE = '/profile';
export const SEARCH_ROUTE = '/search';
export const SHOW_ROUTE = '/show/:showId';

const routes: RouteProps[] = [
  {
    path: SIGN_IN_ROUTE,
    exact: true,
    children: <SignInView/>,
  },
  {
    path: SIGN_UP_ROUTE,
    exact: true,
    children: <SignUpView/>,
  },
  {
    path: FORGOT_PASSWORD_ROUTE,
    exact: true,
    children: <ForgotPasswordView/>,
  },
  {
    path: RESET_PASSWORD_ROUTE,
    exact: true,
    children: <ForgotPasswordView/>,
  },
];

const protectedRoutes: RouteProps[] = [
  {
	  path: HOME_ROUTE,
	  exact: true,
	  children: <Redirect to={SEARCH_ROUTE}/>,
  },
  {
	  path: PROFILE_ROUTE,
	  exact: true,
	  children: <ProfileView/>,
  },
  {
	  path: SEARCH_ROUTE,
	  exact: true,
	  children: <SearchView/>,
  },
  {
	  path: SHOW_ROUTE,
	  exact: true,
	  children: <ShowView/>,
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
          >
            {route.children}
          </Route>
        ))}
	      <ProtectedRoute>
		  	  <Switch>
            <AlertContainer>
              {protectedRoutes.map(((route, index) => 
                <UserLayoutRoute
                  key={index}
                  exact={route.exact}
                  path={route.path}
                >
                  {route.children}
                </UserLayoutRoute>))}
            </AlertContainer>
	        </Switch>
	      </ProtectedRoute>
        <Route component={NotFound}/> (// fix this)
	    </Switch>
	  </BrowserRouter>
  );
};

export default AppRouter;  