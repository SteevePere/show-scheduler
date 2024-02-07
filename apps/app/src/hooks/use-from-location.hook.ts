import { useLocation } from 'react-router-dom';

type LocationState = {
  from: {
    pathname: string;
    search: string;
  }
}

export const useFromLocation = () => {
  const route = useLocation<LocationState>();
  console.log(route);
  
  return route.state?.from.pathname + route.state?.from.search;
};