import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

import { useState,useContext } from "react";
import { Outlet } from "react-router-dom";

import {ThemeContext} from "../context/ThemeContext";
import { borderRight } from "@mui/system";

const drawerWidth = 240;

export default function ClerkLayout() {

   const {color,font} = useContext(ThemeContext);

   const [mobileOpen, setMobileOpen] = React.useState(false);

   const [anchorEl, setAnchorEl] = React.useState(null);
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

   const isMenuOpen = Boolean(anchorEl);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   const [btnValueInRoleMobile, setBtnValueInRoleMobile] =
      useState("Choose Role");

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

   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const handleMobileRole = (role) => {
      switch (role) {
         case "reviewer":
            setBtnValueInRoleMobile("Reviewer");
            break;
         case "secretary":
            setBtnValueInRoleMobile("Secretary");
            break;
         case "clerk":
            setBtnValueInRoleMobile("Clerk");
            break;
         default:
            setBtnValueInRoleMobile("Applicant");
            break;
      }
   };

   const ModalStyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 200,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: 4,
   };

   const drawer = (
      <div>
         <Toolbar sx={{bgcolor:color.primary}}>
            <Typography
               sx={{
                  fontFamily: "monospace",
                  fontSize: 20,
                  lineHeight: 3,
                  ml: 4,
                  fontWeight: 700,
                  color:'white' 
               }}
            >
               ERC SYSTEM
            </Typography>
         </Toolbar>
         <Divider />
         <List>
            <ListItem disablePadding>
               <ListItemButton>
                  <ListItemIcon>
                     <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
               </ListItemButton>
            </ListItem>
            <ListItem
               disablePadding
               sx={{
                  bgcolor: "white",
                  "&:hover": {
                     transition: "0.2s",
                  },
               }}
            >
               <ListItemButton>
                  <ListItemIcon>
                     <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText primary="About Us" />
               </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
               <ListItemButton>
                  <ListItemIcon>
                     <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Email" />
               </ListItemButton>
            </ListItem>
         </List>
         <Divider />
      </div>
   );

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
                  boxShadow:'none'
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
                  </IconButton>{/*header text */}
                  <Typography variant="h6" noWrap component="div" sx={{color:'white',textAlign:'center',width:1000}}>
                     
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
               <Drawer
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                     keepMounted: true, // Better open performance on mobile.
                  }}
                  sx={{
                     display: { xs: "block", sm: "none" },
                     "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
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
                        width: drawerWidth,
                        borderRightColor:color.primary,
                        borderRightWidth:1
                        
                     },
                  }}
                  open
               >
                  {drawer}
               </Drawer>
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
               <Box
                  sx={{
                     mt: 3,
                     display: { xs: "none", md: "block" },
                     mx: "auto",
                     width: 500,
                  }}
               >
                  <Stack direction="row" spacing={5}>
                     <Button variant="outlined">Applicant</Button>
                     <Button variant="outlined">Reviewer</Button>
                     <Button variant="outlined">Clerk</Button>
                     <Button variant="outlined">Secretary</Button>
                  </Stack>
               </Box>
               <Box sx={{ display: { xs: "block", md: "none" }, mt: 3,transition: "0.2s", }}>
                  <Box sx={{ mx: "auto", width: 150 }}>
                     <Button onClick={handleOpen} variant="outlined" sx={{width:150}}>
                        {btnValueInRoleMobile}
                     </Button>
                  </Box>
                  <Modal
                     open={open}
                     onClose={handleClose}
                     aria-labelledby="modal-modal-title"
                     aria-describedby="modal-modal-description"
                  >
                     <Box sx={ModalStyle}>
                        <Stack direction="column" spacing={2}>
                           <Button
                              variant="outlined"
                              onClick={() => {
                                 handleMobileRole("applicant");
                                 handleClose();
                              }}
                           >
                              Applicant
                           </Button>
                           <Button
                              variant="outlined"
                              onClick={() => {
                                 handleMobileRole("reviewer");
                                 handleClose();
                              }}
                           >
                              Reviewer
                           </Button>
                           <Button
                              variant="outlined"
                              onClick={() => {
                                 handleMobileRole("clerk");
                                 handleClose();
                              }}
                           >
                              Clerk
                           </Button>
                           <Button
                              variant="outlined"
                              onClick={() => {
                                 handleMobileRole("secretary");
                                 handleClose();
                              }}
                           >
                              Secretary
                           </Button>
                        </Stack>
                     </Box>
                  </Modal>
               </Box>
               <Outlet />
            </Box>
         </Box>
      </>
   );
}
