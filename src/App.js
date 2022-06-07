import React from "react";
import { useRoutes, useLocation } from "react-router-dom";

import routes from "./routes";

import ThemeContextProvider from "./context/ThemeContext";

import { useSelector } from "react-redux";

function App() {
   const { pathname } = useLocation();
   const { isAuthenticated, roles } = useSelector(
      (state) => state.authentication.value
   );
   console.log(roles.includes("clerk"), isAuthenticated);
   const routing = useRoutes(
      routes(isAuthenticated, roles, (parent, child) =>
         pathname.split("/").filter((i) => i).length === 1 ? parent : child
      )
   );
   return <ThemeContextProvider>{routing}</ThemeContextProvider>;
}

export default App;
