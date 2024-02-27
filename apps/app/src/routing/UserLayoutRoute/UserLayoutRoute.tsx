import { Route } from 'react-router-dom';

import UserLayout from '../../layout/UserLayout/UserLayout';

interface UserLayoutRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  path?: string | readonly string[] | undefined;
  exact?: boolean | undefined;
};

const UserLayoutRoute = ({ children, ...rest }: UserLayoutRouteProps) => { // find out why mounted twice per route
  return (
    <Route
      {...rest}
    >
      <UserLayout
        content={children}
      />
    </Route>
  );
};

export default UserLayoutRoute;