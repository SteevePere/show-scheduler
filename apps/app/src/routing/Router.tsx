import React from 'react';
import {
  BrowserRouter, Route, Switch
} from "react-router-dom";

import NotFound from "./NotFound/NotFound";
import UserLayoutRoute from './UserLayoutRoute/UserLayoutRoute';

const AppRouter = () => {
	return (
	  <BrowserRouter>
	    <Switch>
	      <UserLayoutRoute exact path='/posts' component={<>Hello</>}/>
	      <Route component={NotFound}/>
	    </Switch>
	  </BrowserRouter>
	);
};


export default AppRouter;  