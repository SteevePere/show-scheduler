import { useSelector } from "react-redux";

import { RootState } from "../store/store";

export const useCurrentUser = () => {
    const { currentUser } = useSelector((state: RootState) => state.auth);
    return currentUser;
};