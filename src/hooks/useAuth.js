import { useEffect } from "react";

import { useSelector } from "react-redux";

import {
   useLazyGetUserQuery,
   selectIsAuthenticated,
   selectCurrentUser,
} from "api/auth/api";

const useAuth = (init = true) => {
   const user = useSelector(selectCurrentUser);
   const isAuthenticated = useSelector(selectIsAuthenticated);

   const [initGetUser, { isUninitialized, isLoading }] = useLazyGetUserQuery();

   const isInitializing = init && isAuthenticated && isUninitialized;

   useEffect(() => {
      if (isInitializing) {
         initGetUser(undefined, true);
      }
   }, [isInitializing, initGetUser]);

   return { user, isAuthenticated, isLoading: isInitializing || isLoading };
};

export default useAuth;
