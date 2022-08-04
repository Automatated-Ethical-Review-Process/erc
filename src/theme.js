import { cyan } from "@mui/material/colors";

const getLightPalette = () => ({
  primary: {
    light: "#12CBC4",
    main: "#1289A7",
    dark: "#006266",
  },
  secondary: {
    light: cyan[100],
    main: cyan[700],
    dark: cyan[900],
  },
  proIconColor: {
    main: "balck",
  },
});

const getDarkPalette = () => ({
  primary: {
    light: "#12CBC4",
    main: "#1289A7",
    dark: "#006266",
  },
  secondary: {
    light: cyan[600],
    main: cyan[700],
    dark: cyan[900],
  },
  proIconColor: {
    main: "white",
  },
});

const getPalette = (isLight) =>
  isLight ? getLightPalette() : getDarkPalette();

export default getPalette;
