import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";

import routes from "./routes";

import ThemeContextProvider from "./context/ThemeContext";

import { useDispatch } from "react-redux";

import { setNotification } from "./store/notificationSlice";

function App() {
   const dispatch = useDispatch();
   dispatch(setNotification(5));
   const routing = useRoutes(routes(null, null));
   return <ThemeContextProvider>{routing}</ThemeContextProvider>;
}

export default App;
