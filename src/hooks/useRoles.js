import { useSelector } from "react-redux";

import { selectCurrentUser } from "api/auth/api";

const useRoles = () => {
   const { roles } = useSelector(selectCurrentUser);
   return roles;
};

export default useRoles;
