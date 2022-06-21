import { indigo, blue, lightBlue, cyan } from "@mui/material/colors";

const getLightPalette = () => ({
   primary: {
      light: indigo[700],
      main: indigo[800],
      dark: indigo[900],
   },
   secondary: {
      light: blue[100],
      main: blue[200],
      dark: blue[300],
   },
});

const getDarkPalette = () => ({
   primary: {
      light: lightBlue[100],
      main: lightBlue[200],
      dark: lightBlue[300],
   },
   secondary: {
      light: cyan[700],
      main: cyan[800],
      dark: cyan[900],
   },
});

const getPalette = (isLight) =>
   isLight ? getLightPalette() : getDarkPalette();

export default getPalette;
