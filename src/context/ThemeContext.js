import React, { createContext } from "react";

export const ThemeContext = createContext();

function ThemeContextProvider(props) {
   const theme = {
      color: {
         main: {
            primary: "#227093", //"#178685"
            secondary: "#7f8c8d",
            error: "",
            warning: "",
         },
         component: {
            listSelected: "dde7ef",
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
