import React from "react";
import { useRoutes } from "react-router-dom";

import routes from "./routes";

import ThemeContextProvider from "./context/ThemeContext";

function App() {
   const routing = useRoutes(routes(null, null));
   return <ThemeContextProvider>{routing}</ThemeContextProvider>;
}

export default App;
