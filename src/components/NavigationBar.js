import * as React from "react";
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

const pages = ["Home", "Sign in", "Sign up", "Instruction"];

const NavigationBar = () => {
   const [anchorElNav, setAnchorElNav] = React.useState(null);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const theme = createTheme({
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
      <ThemeProvider theme={theme}>
         <AppBar position="static" sx={{ p: 0.1}} >
           
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
                        justifyContent:'flex-start'
                     }}
                  >
                     LOGO
                  </Typography>
                  <Box
                     sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                  >
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
                           <MenuItem key={page} onClick={handleCloseNavMenu}>
                              <Typography textAlign="center">{page}</Typography>
                           </MenuItem>
                        ))}
                     </Menu>
                  </Box>
                  <Typography
                     variant="h5"
                     noWrap
                     component="a"
                     href=""
                     sx={{
                        mr: 2,
                        ml: { xs: 0, md: 6 },
                        display: { xs: "flex", md: "flex" },
                        flexGrow: 1,
                        fontWeight: 500,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                        fontSize: { xs: 15, md: 30 },
                        fontFamily: "monospace",
                     }}
                  >
                     Ethical Review Committee
                  </Typography>
                  <Box
                     sx={{
                        flexGrow: 1,
                        display: { xs: "none", md: "flex" },
                        justifyContent: "right",
                     }}
                  >
                     <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 0, color: "white", display: "block" }}
                     >
                        Home
                     </Button>
                     <Button
                        onClick={handleCloseNavMenu}
                        sx={{
                           my: 0,
                           color: "white",
                           display: "block",
                           fontSize:15
                        }}
                     >
                        Sign in
                     </Button>
                     <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 0, color: "white", display: "block" }}
                     >
                        Sign up
                     </Button>
                     <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 0, color: "white", display: "block" }}
                     >
                        Instruction
                     </Button>
                  </Box>
               </Toolbar>
            
         </AppBar>
      </ThemeProvider>
   );
};
export default NavigationBar;
