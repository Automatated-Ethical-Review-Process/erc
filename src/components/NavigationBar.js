import React from "react";
import { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";

import Drawer from "./Drawer";
import useTheme from "hooks/useTheme";

import { useLogoutMutation } from "api/auth/api";
import routes from "config/routes";

export default function SidebarLayout({ title, sideBarItems, children }) {
   const theme = useTheme();

   const [mobileOpen, setMobileOpen] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

   const isMenuOpen = Boolean(anchorEl);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   const navigate = useNavigate();
   const location = useLocation();

   const notifications = useSelector(
      (state) => state.notifications.value.count
   );

   const [logout] = useLogoutMutation();

   const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
   };

   const handleNotification = () => {
      handleMenuClose();
      navigate(routes.notification);
   };

   const handleProfile = () => {
      handleMenuClose();
      navigate(routes.profile);
   };

   const handleLogout = () => {
      handleMenuClose();
      logout()
         .unwrap()
         .then(() => navigate(routes.home, { state: { from: location } }))
         .catch((err) => console.log(err));
   };

   const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
   };

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const renderMenu = (
      <Menu
         anchorEl={anchorEl}
         anchorOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         keepMounted
         transformOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         open={isMenuOpen}
         onClose={handleMenuClose}
      >
         <MenuItem onClick={handleProfile}>Profile</MenuItem>
         <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
   );

   const renderMobileMenu = (
      <Menu
         anchorEl={mobileMoreAnchorEl}
         anchorOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         keepMounted
         transformOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         open={isMobileMenuOpen}
         onClose={handleMobileMenuClose}
      >
         <MenuItem onClick={handleNotification}>
            <IconButton size="large" color="inherit">
               <Badge badgeContent={notifications} color="error">
                  <NotificationsIcon />
               </Badge>
            </IconButton>
            <p>Notifications</p>
         </MenuItem>
         <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton size="large" color="inherit">
               <AccountCircle />
            </IconButton>
            <p>Profile</p>
         </MenuItem>
      </Menu>
   );

   return (
      <Box sx={{ display: "flex" }}>
         <AppBar
            position="fixed"
            sx={{
               boxShadow: "none",
               bgcolor: theme.color.main.primary,
               zIndex: (t) => t.zIndex.drawer + 1,
            }}
         >
            <Toolbar>
               {sideBarItems && (
                  <IconButton
                     color="inherit"
                     edge="start"
                     onClick={handleDrawerToggle}
                     sx={{ mr: 2, display: { sm: "none" } }}
                  >
                     <MenuIcon />
                  </IconButton>
               )}

               <Typography
                  sx={{
                     fontFamily: "monospace",
                     fontSize: 20,
                     lineHeight: 3,
                     fontWeight: 700,
                     color: "white",
                  }}
               >
                  {title}
               </Typography>

               <Box
                  sx={{
                     display: { xs: "none", md: "flex" },
                     flexGrow: 1,
                     justifyContent: "right",
                  }}
               >
                  <IconButton
                     size="large"
                     color="inherit"
                     onClick={handleNotification}
                  >
                     <Badge badgeContent={notifications} color="error">
                        <NotificationsIcon />
                     </Badge>
                  </IconButton>
                  <IconButton
                     size="large"
                     edge="end"
                     onClick={handleProfileMenuOpen}
                     color="inherit"
                  >
                     <AccountCircle />
                  </IconButton>
               </Box>
               <Box
                  sx={{
                     display: { xs: "flex", md: "none" },
                     flexGrow: 1,
                     justifyContent: "right",
                  }}
               >
                  <IconButton
                     size="large"
                     onClick={handleMobileMenuOpen}
                     color="inherit"
                  >
                     <MoreIcon />
                  </IconButton>
               </Box>
            </Toolbar>
         </AppBar>
         {renderMobileMenu}
         {renderMenu}
         {sideBarItems && (
            <Drawer
               open={mobileOpen}
               onClose={handleDrawerToggle}
               items={sideBarItems}
            />
         )}
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               p: 1,
               mt: { xs: 1, sm: 0 },
               mb: 3,
            }}
         >
            <Toolbar />
            {children}
         </Box>
      </Box>
   );
}
