import React from 'react';
import { Route } from 'react-router-dom';

import UserLayout from '../../layout/UserLayout/UserLayout';

interface UserLayoutRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
  path?: string | readonly string[] | undefined;
  exact?: boolean | undefined;
};

const UserLayoutRoute = ({ component, ...rest }: UserLayoutRouteProps) => {
  return (
    <Route
      {...rest}
      component={(props: JSX.IntrinsicAttributes) =>
        <UserLayout
          {...props}
          content={component}
        />
      }
    />
  );
};

export default UserLayoutRoute;