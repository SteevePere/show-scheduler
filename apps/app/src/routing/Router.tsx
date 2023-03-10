import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter, Route, Switch
} from 'react-router-dom';

import { useAppDispatch } from '../hooks/use-app-dispatch.hook';
import { getCurrentUser } from '../store/auth/auth.thunks';
import { RootState } from '../store/store';
import { SignInView } from '../views/Authentication/SignInView';
import NotFound from './NotFound/NotFound';
import { ProtectedRoute } from './ProtectedRoute';
import UserLayoutRoute from './UserLayoutRoute/UserLayoutRoute';

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
	      <Route exact path='/sign-in' component={SignInView}/>
	      <ProtectedRoute>
		  	<Switch>
	          <UserLayoutRoute exact path='/posts' component={<>Hello</>}/>
	        </Switch>
	      </ProtectedRoute>
	      <Route component={NotFound}/>
	    </Switch>
	  </BrowserRouter>
  );
};

export default AppRouter;  