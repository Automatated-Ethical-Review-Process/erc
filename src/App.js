import React, { useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import routes from "./routes";

import ThemeContextProvider from "./context/ThemeContext";

import authApi, {
   selectIsAuthenticated,
   selectCurrentUser,
} from "api/auth/api";

function App() {
   const { pathname } = useLocation();

   const dispatch = useDispatch();

   const isAuthenticated = useSelector(selectIsAuthenticated);
   const user = useSelector(selectCurrentUser);

   useEffect(() => {
      console.log(isAuthenticated);
      if (isAuthenticated) {
         dispatch(authApi.endpoints.getUser.initiate());
      }
   }, [isAuthenticated, dispatch]);

   console.log("app rendered");

   const routing = useRoutes(
      routes(isAuthenticated, user.roles, (parent, child) =>
         pathname.split("/").filter((i) => i).length === 1 ? parent : child
      )
   );

   return <ThemeContextProvider>{routing}</ThemeContextProvider>;
}

export default App;
