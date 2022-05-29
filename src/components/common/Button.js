import React, { useContext } from "react";
import BaseButton from "@mui/material/Button";

import { ThemeContext } from "context/ThemeContext";

const Button = (props) => {
   const { theme } = useContext(ThemeContext);
   return (
      <BaseButton
         {...props}
         sx={{
            backgroundColor: theme.color.main.primary,
            borderColor: theme.color.main.primary,
            fontFamily: theme.font.button.family,
            fontWeight: 700,
            "&:hover": {
               boxShadow: 10,
               color: "white",
               backgroundColor: theme.color.main.primary,
               borderColor: theme.color.main.primary,
               transitionDuration: "0.4s",
            },
            ...props.sx,
         }}
      >
         {props.children}
      </BaseButton>
   );
};

export default Button;
