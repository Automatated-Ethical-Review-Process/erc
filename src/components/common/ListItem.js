import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function AListItem({ location, navigate, path, icon, text }) {
   return (
      <ListItem
         disablePadding
         sx={{
            bgcolor: "white",
            "&:hover": {
               transition: "0.2s",
            },
         }}
         selected={location.pathname.startsWith(path) ? true : false}
         onClick={() => navigate(path)}
      >
         <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
         </ListItemButton>
      </ListItem>
   );
}
