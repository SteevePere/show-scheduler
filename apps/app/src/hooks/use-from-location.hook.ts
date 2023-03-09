import { useLocation } from "react-router-dom";

type LocationState = {
  from: {
    path: string;
  }
}

export const useFromLocation = () => {
  const route = useLocation<LocationState>();
  return route.state?.from.path;
}; 