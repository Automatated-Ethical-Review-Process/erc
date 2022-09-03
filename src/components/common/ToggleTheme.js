import IconButton from "@mui/material/IconButton";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "styled-components";

function ToggleTheme({ sx }) {
  const theme = useTheme();

  return (
    <IconButton
      size="large"
      onClick={theme.toggleTheme}
      color="inherit"
      sx={sx}
    >
      {theme.isLight ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}

export default ToggleTheme;
