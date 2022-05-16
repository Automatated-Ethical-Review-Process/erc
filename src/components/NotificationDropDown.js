
import React from "react";
import { useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InboxIcon from "@mui/icons-material/Inbox";

const NotificationDropDown = () => {
   return (
      <>
         <List sx={{bgcolor:'red',transform:('50%','50%')}}>
            <ListItem disablePadding>
               <ListItemButton>
                  <ListItemIcon>
                     <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
               </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
               <ListItemButton>
                  <ListItemIcon>
                     <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
               </ListItemButton>
            </ListItem>
            
         </List>
      </>
   );
};

export default NotificationDropDown;
