import { useState, useCallback, useMemo } from "react";

import { useMediaQuery } from "@mui/material";
import { ThemeProvider } from "styled-components";
import {
   createTheme,
   ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import getPalette from "theme";
import AppRoutes from "routes";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
   const preferDark = useMediaQuery("(prefers-color-scheme: dark)");
   const [mode, setMode] = useState(preferDark ? "dark" : "light");

   const toggleTheme = useCallback(() => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
   }, [setMode]);

   const theme = useMemo(
      () =>
         createTheme({
            palette: {
               mode,
               ...getPalette(mode === "light"),
            },
            isLight: mode === "light",
            toggleTheme,
         }),
      [mode, toggleTheme]
   );

   return (
      <MuiThemeProvider theme={theme}>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRoutes />
         </ThemeProvider>
      </MuiThemeProvider>
   );
}

export default App;
