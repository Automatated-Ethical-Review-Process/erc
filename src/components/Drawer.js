import { useContext } from "react";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";

import { ThemeContext } from "../context/ThemeContext";

import SidebarList from "./SidebarList";

export default function ADrawer({ open, onClose, width, items }) {
   const { theme } = useContext(ThemeContext);

   const drawer = (
      <div>
         <Toolbar sx={{ bgcolor: theme.color.main.primary }}>
            <Typography
               sx={{
                  fontFamily: "monospace",
                  fontSize: 20,
                  lineHeight: 3,
                  ml: 4,
                  fontWeight: 700,
                  color: "white",
               }}
            >
               ERC SYSTEM
            </Typography>
         </Toolbar>
         <SidebarList items={items} />
      </div>
   );

   return (
      <>
         <Drawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{
               keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
               display: { xs: "block", sm: "none" },
               "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: width,
               },
            }}
         >
            {drawer}
         </Drawer>
         <Drawer
            variant="permanent"
            sx={{
               display: { xs: "none", sm: "block" },
               "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: width,
                  borderRightColor: theme.color.main.primary,
                  borderRightWidth: 1,
               },
            }}
            open
         >
            {drawer}
         </Drawer>
      </>
   );
}
