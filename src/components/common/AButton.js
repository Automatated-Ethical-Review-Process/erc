import React, { useContext } from "react";
import { Button } from "@mui/material";

import { ThemeContext } from "context/ThemeContext";

const AButton = (props) => {
   const { theme } = useContext(ThemeContext);
   return (
      <Button
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
      </Button>
   );
};

export default AButton;
