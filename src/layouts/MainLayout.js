import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Outlet, useNavigate } from "react-router-dom";

import Footer from "components/Footer";
import useTheme from "hooks/useTheme";

const pages = ["Sign in", "Sign up", "Instruction"];

const NavigationBar = () => {
   const theme = useTheme();
   const navigate = useNavigate();

   const [anchorElNav, setAnchorElNav] = useState(null);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleOnClick = (page) => {
      switch (page) {
         case pages[0]:
            navigate("/");
            break;
         case pages[1]:
            navigate("/verify");
            break;
         case pages[2]:
            alert("Not Implemented !");
            break;
         default:
            throw new Error("invalid index");
      }
      handleCloseNavMenu();
   };

   const themeLocal = createTheme({
      breakpoints: {
         values: {
            xs: 0,
            sm: 600,
            md: 900,
            tab: 1024,
            lg: 1200,
            xl: 1536,
         },
      },
   });

   return (
      <ThemeProvider theme={themeLocal}>
         <AppBar
            position="static"
            sx={{ p: 0.1, backgroundColor: theme.color.main.primary }}
         >
            <Toolbar disableGutters>
               <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                     ml: 2,
                     display: { xs: "none", md: "flex" },
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none",
                     justifyContent: "flex-start",
                  }}
               >
                  LOGO
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleOpenNavMenu}
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: "block", md: "none" },
                     }}
                  >
                     {pages.map((page) => (
                        <MenuItem
                           key={page}
                           onClick={() => handleOnClick(page)}
                        >
                           <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
               <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                     mr: 2,
                     ml: { xs: 0, md: 6 },
                     display: "flex",
                     flexGrow: 1,
                     fontWeight: 500,
                     letterSpacing: { xs: ".1rem", md: ".3rem" },
                     color: "inherit",
                     textDecoration: "none",
                     fontSize: { xs: 15, md: 30 },
                     fontFamily: "monospace",
                  }}
               >
                  {"Ethical Review Committee".toLocaleUpperCase()}
               </Typography>
               <Box
                  sx={{
                     flexGrow: 1,
                     display: { xs: "none", md: "flex" },
                     justifyContent: "right",
                  }}
               >
                  {pages.map((page) => (
                     <Button
                        key={page}
                        onClick={() => handleOnClick(page)}
                        sx={{ my: 0, color: "white", display: "block" }}
                     >
                        {page}
                     </Button>
                  ))}
               </Box>
            </Toolbar>
         </AppBar>
      </ThemeProvider>
   );
};

export default function MainLayout() {
   return (
      <>
         <NavigationBar />
         <Box sx={{ mb: 8 }}>
            <Outlet />
         </Box>
         <Footer />
      </>
   );
}
