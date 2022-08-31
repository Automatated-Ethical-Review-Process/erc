import { useState } from "react";
import { emphasize } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import image from "assets/uor_logo.png";
import Footer from "components/Footer";

const pages = ["Home", "Sign in", "Sign up", "Instruction"];

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
        navigate("/signin");
        break;
      case pages[2]:
        navigate("/signup");
        break;
      case pages[3]:
        alert("Not Implemented !");
        break;
      default:
        throw new Error("invalid index");
    }
    handleCloseNavMenu();
  };

  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ p: 0.1 }}>
      <Toolbar disableGutters>
        <Card
          style={{ border: "none", boxShadow: "none" }}
          sx={{
            maxWidth: 345,
            bgcolor: theme.isLight ? "#1289A7" : "#211e1b",
            display: { xs: "none", md: "block" },
          }}
        >
          <CardMedia
            component="img"
            height="90"
            image={image}
            alt="University Logo"
          />
        </Card>
        <Box
          sx={{
            width: 50,
            // flexGrow: 1,
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
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
        <Box sx={{}}>
          <Typography
            variant="h1"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: { xs: 0, md: 1 },
              display: "flex",
              // flexGrow: 1,
              fontWeight: 500,
              letterSpacing: { xs: ".1rem", md: ".2rem" },
              color: "inherit",
              textDecoration: "none",
              fontSize: { xs: 15, md: 30 },
              fontFamily: "serif",
            }}
          >
            {"Ethical Review Committee"}
          </Typography>

          <Typography
            variant="h1"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: { xs: 0, md: 1 },
              display: "flex",
              // flexGrow: 1,
              fontWeight: 250,
              letterSpacing: { xs: ".1rem", md: ".2rem" },
              color: "inherit",
              textDecoration: "none",
              fontSize: { xs: 15, md: 25 },
            }}
          >
            {"Faculty of Medicine"}
          </Typography>
          <Typography
            variant="h1"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: { xs: 0, md: 1 },
              display: "flex",
              // flexGrow: 1,
              fontWeight: 350,
              letterSpacing: { xs: ".1rem", md: ".2rem" },
              color: "inherit",
              textDecoration: "none",
              fontSize: { xs: 15, md: 20 },
            }}
          >
            {"University of Ruhuna"}
          </Typography>
        </Box>
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
                  color: (t) => emphasize(t.palette.secondary.light, 0.12),
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
