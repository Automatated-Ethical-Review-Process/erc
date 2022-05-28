import React from "react";
import { useRoutes, useLocation } from "react-router-dom";

import routes from "./routes";

import ThemeContextProvider from "./context/ThemeContext";

function App() {
   const { pathname } = useLocation();

   const routing = useRoutes(
      routes(null, null, (parent, child) =>
         pathname.split("/").filter((i) => i).length === 1 ? parent : child
      )
   );
   return <ThemeContextProvider>{routing}</ThemeContextProvider>;
}

export default App;
