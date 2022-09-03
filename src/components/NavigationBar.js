import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Drawer from "./Drawer";

import { useLogoutMutation } from "api/auth/api";
import routes from "config/routes";

import authService from "services/auth";
import {
  closeNotificationSocket,
  OnNotificationSocket,
} from "services/notification/notificationService";

import useNotify from "hooks/useNotify";

import { useGetMeQuery } from "api/data/user";
import {
  selectNotificationCount,
  useGetNotificationsQuery,
} from "api/notification/api";
import { useDispatch, useSelector } from "react-redux";
import LoadingCircle from "./common/LoadingCircle";
import ToggleTheme from "./common/ToggleTheme";

export default function NavigationBar({
  title,
  role = title,
  sideBarItems,
  children,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notify } = useNotify();

  useGetNotificationsQuery();
  const { data = {}, isLoading } = useGetMeQuery();
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      OnNotificationSocket(authService.access, dispatch, notify, navigate);
    }
  }, [ref, dispatch, notify, navigate]);

  const notifications = useSelector(selectNotificationCount);

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
    logout();
    closeNotificationSocket();
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
        <p>{data.name || "Profile"}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <LoadingCircle isLoading={isLoading} />
      <AppBar
        position="fixed"
        sx={{
          boxShadow: "none",
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
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(
                title.toLowerCase() === "dashboard"
                  ? routes.home
                  : routes.signIn
              )
            }
          >
            {role.toUpperCase()}
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: "right",
            }}
          >
            <ToggleTheme />
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
              <Typography sx={{ ml: 1, mt: 0.5 }} variant="subtitle2">
                {data.name}
              </Typography>
            </IconButton>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              justifyContent: "right",
            }}
          >
            <ToggleTheme />
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
