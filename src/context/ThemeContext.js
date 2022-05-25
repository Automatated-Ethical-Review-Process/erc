import React, { createContext } from "react";

export const ThemeContext = createContext();

function ThemeContextProvider(props) {
   const theme = {
      color: {
         main: {
            primary: "#227093", //"#178685"
            secondary: "",
            error: "",
            warning: "",
         },
         component: {
            listSelected: "#73b6b5",
         },
      },
      font: {
         button: {
            family: "monospace",
         },
      },
   };
   return (
      <ThemeContext.Provider
         value={{
            theme,
         }}
      >
         {props.children}
      </ThemeContext.Provider>
   );
}

export default ThemeContextProvider;
