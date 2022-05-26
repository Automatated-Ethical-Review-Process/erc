import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

export default function AListItem({ location, navigate, path, icon, text }) {
   const { theme } = useContext(ThemeContext);

   return (
      <ListItem
         disablePadding
         sx={{
            bgcolor: "white",
            "&:hover": {
               backgroundColor: theme.color.main.primary,
               color: "white",
               transition: "0.2s",
            },
            "&.Mui-selected": {
               backgroundColor: theme.color.main.primary,
               color: "white",
               transition: "0.2s",
            },
         }}
         selected={location.pathname.startsWith(path) ? true : false}
         onClick={() => navigate(path)}
      >
         <ListItemButton>
            <ListItemIcon
               sx={{
                  color: location.pathname.startsWith(path) ? "white" : null,
               }}
            >
               {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
         </ListItemButton>
      </ListItem>
   );
}
