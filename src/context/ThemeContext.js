import React, { createContext } from "react";

export const ThemeContext = createContext();

function ThemeContextProvider(props) {
   const color = { primary: "", secondry: "", error: "", warning: "" };
   return (
      <ThemeContext.Provider
         value={{
            color: color,
         }}
      >
         {props.children}
      </ThemeContext.Provider>
   );
}

export default ThemeContextProvider;
