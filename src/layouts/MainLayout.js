import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { emphasize } from "@mui/material/styles";

import { Outlet, useNavigate } from "react-router-dom";

import Footer from "components/Footer";

const pages = ["Sign in", "Sign up", "Instruction"];

const NavigationBar = () => {
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
            navigate("/signup");
            break;
         case pages[2]:
            alert("Not Implemented !");
            break;
         default:
            throw new Error("invalid index");
      }
      handleCloseNavMenu();
   };

   return (
      <AppBar position="static" sx={{ p: 0.1 }}>
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
                     <MenuItem key={page} onClick={() => handleOnClick(page)}>
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
                  <Typography
                     key={page}
                     onClick={() => handleOnClick(page)}
                     sx={{
                        cursor: "pointer",
                        mx: 1,
                        "&:hover, &:focus": {
                           color: (t) =>
                              emphasize(t.palette.secondary.light, 0.12),
                        },
                     }}
                  >
                     {page}
                  </Typography>
               ))}
            </Box>
         </Toolbar>
      </AppBar>
   );
};

export default function MainLayout() {
   return (
      <>
         <NavigationBar />
         <Box sx={{ mb: 1 }}>
            <Outlet />
         </Box>
         <Footer />
      </>
   );
}
