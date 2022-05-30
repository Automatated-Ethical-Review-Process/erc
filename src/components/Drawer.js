import { useContext } from "react";

import Toolbar from "@mui/material/Toolbar";
import BaseDrawer from "@mui/material/Drawer";

import { ThemeContext } from "context/ThemeContext";

import SidebarList from "./common/SidebarList";

const drawerWidth = 240;

export default function Drawer({ open, onClose, items }) {
   const { theme } = useContext(ThemeContext);

   const drawer = (
      <div>
         <Toolbar />
         <SidebarList items={items} />
      </div>
   );

   return (
      <>
         <BaseDrawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{
               keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
               width: drawerWidth,
               display: { xs: "block", sm: "none" },
               "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
               },
            }}
         >
            {drawer}
         </BaseDrawer>
         <BaseDrawer
            variant="permanent"
            sx={{
               width: drawerWidth,
               display: { xs: "none", sm: "block" },
               "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  borderRightColor: theme.color.main.primary,
                  borderRightWidth: 1,
               },
            }}
            open
         >
            {drawer}
         </BaseDrawer>
      </>
   );
}
