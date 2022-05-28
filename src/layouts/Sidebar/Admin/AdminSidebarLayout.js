import React from "react";
import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import { ThemeContext } from "context/ThemeContext";

import RoleNavigationBar from "components/RoleNavigationBar";
import ADrawer from "components/Drawer";

const drawerWidth = 240;

const sideBarItems = [
   { path: "/admin/users", icon: <AccountBoxIcon />, text: "Current Users" },
   { path: "/admin/add-user", icon: <PersonAddAltIcon />, text: "Add Users" },
];

export default function AdminLayout() {
   const { theme } = useContext(ThemeContext);

   const [mobileOpen, setMobileOpen] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

   const isMenuOpen = Boolean(anchorEl);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

   const handleLogout = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
      alert("You logout..!");
   };

   const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
   };

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const menuId = "primary-search-account-menu";
   const renderMenu = (
      <Menu
         anchorEl={anchorEl}
         anchorOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         id={menuId}
         keepMounted
         transformOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         open={isMenuOpen}
         onClose={handleMenuClose}
      >
         <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
         <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
   );

   const mobileMenuId = "primary-search-account-menu-mobile";
   const renderMobileMenu = (
      <Menu
         anchorEl={mobileMoreAnchorEl}
         anchorOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         id={mobileMenuId}
         keepMounted
         transformOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         open={isMobileMenuOpen}
         onClose={handleMobileMenuClose}
      >
         <MenuItem onClick={handleMenuClose}>
            <IconButton
               size="large"
               aria-label="show 4 new mails"
               color="inherit"
            >
               <Badge badgeContent={4} color="error">
                  <MailIcon />
               </Badge>
            </IconButton>
            <p>Messages</p>
         </MenuItem>
         <MenuItem onClick={handleMenuClose}>
            <IconButton
               size="large"
               aria-label="show 17 new notifications"
               color="inherit"
            >
               <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
               </Badge>
            </IconButton>
            <p>Notifications</p>
         </MenuItem>
         <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
               size="large"
               aria-label="account of current user"
               aria-controls="primary-search-account-menu"
               aria-haspopup="true"
               color="inherit"
            >
               <AccountCircle />
            </IconButton>
            <p>Profile</p>
         </MenuItem>
      </Menu>
   );

   return (
      <>
         <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
               position="fixed"
               sx={{
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
                  ml: { sm: `${drawerWidth}px` },
                  boxShadow: "none",
                  bgcolor: theme.color.main.primary,
               }}
            >
               <Toolbar>
                  <IconButton
                     color="inherit"
                     aria-label="open drawer"
                     edge="start"
                     onClick={handleDrawerToggle}
                     sx={{ mr: 2, display: { sm: "none" } }}
                  >
                     <MenuIcon />
                  </IconButton>
                  {/*header text */}
                  <Typography
                     variant="h6"
                     noWrap
                     component="div"
                     sx={{ color: "white", textAlign: "center", width: 1000 }}
                  ></Typography>
                  <Box
                     sx={{
                        display: { xs: "none", md: "flex" },
                        flexGrow: 1,
                        justifyContent: "right",
                     }}
                  >
                     <IconButton
                        size="large"
                        aria-label="show 4 new mails"
                        color="inherit"
                     >
                        <Badge badgeContent={4} color="error">
                           <MailIcon />
                        </Badge>
                     </IconButton>
                     <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                     >
                        <Badge badgeContent={17} color="error">
                           <NotificationsIcon />
                        </Badge>
                     </IconButton>
                     <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
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
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
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
            <Box
               component="nav"
               sx={{
                  width: { sm: drawerWidth },
                  flexShrink: { sm: 0 },
               }}
               aria-label="mailbox folders"
            >
               {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
               <ADrawer
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  width={drawerWidth}
                  items={sideBarItems}
               />
            </Box>
            <Box
               component="main"
               sx={{
                  flexGrow: 1,
                  mt: { xs: 3.9, sm: 5, md: 5 },
                  p: 1,
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
               }}
            >
               <RoleNavigationBar role="admin" />
               <Outlet />
            </Box>
         </Box>
      </>
   );
}
