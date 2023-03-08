import React from 'react';
import {
  BrowserRouter, Route, Switch
} from "react-router-dom";

import { SignInView } from '../views/Authentication/SignInView';
import NotFound from "./NotFound/NotFound";
import UserLayoutRoute from './UserLayoutRoute/UserLayoutRoute';

const AppRouter = () => {
	return (
	  <BrowserRouter>
	    <Switch>
	      <UserLayoutRoute exact path='/posts' component={<>Hello</>}/>
	      <Route exact path='/sign-in' component={SignInView}/>
	      <Route component={NotFound}/>
	    </Switch>
	  </BrowserRouter>
	);
};

export default AppRouter;  