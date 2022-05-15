import React, { createContext } from "react";

export const ThemeContext = createContext();

function ThemeContextProvider(props) {
   const color = { primary: "#1976d2", secondry: "", error: "", warning: "" };
   return (
      <ThemeContext.Provider
         value={{
            color: color,
            font : '',
         }}
      >
         {props.children}
      </ThemeContext.Provider>
   );
}

export default ThemeContextProvider;
