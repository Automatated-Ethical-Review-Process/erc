import { useState, useContext } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";

import { useNavigate } from "react-router-dom";

import { ThemeContext } from "context/ThemeContext";

import { useSelector } from "react-redux";

export default function DashboardNavigationBar() {
   const { theme } = useContext(ThemeContext);

   const [anchorEl, setAnchorEl] = useState(null);
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

   const isMenuOpen = Boolean(anchorEl);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   const notifications = useSelector(
      (state) => state.notifications.value.count
   );

   const navigate = useNavigate();

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

   const handleProfile = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
      navigate("/profile");
   };

   const handleLogout = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
      navigate("/");
   };

   const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
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
         <MenuItem onClick={handleProfile}>Profile</MenuItem>
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
      <Box sx={{ display: "flex" }}>
         <AppBar
            position="fixed"
            sx={{
               position: "relative",
               borderBottom: (t) => `1px solid ${t.palette.divider}`,
               bgcolor: theme.color.main.primary,
            }}
         >
            <Toolbar>
               <Typography variant="h6">Dashboard</Typography>
               <Box
                  sx={{
                     display: { xs: "none", md: "flex" },
                     flexGrow: 1,
                     justifyContent: "right",
                  }}
               >
                  <IconButton
                     size="large"
                     aria-label="show 17 new notifications"
                     color="inherit"
                  >
                     <Badge badgeContent={notifications} color="error">
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
      </Box>
   );
}
