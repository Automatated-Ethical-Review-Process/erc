import * as React from "react";
import { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ThemeContext } from "../../context/ThemeContext";
import Step1 from "./Step1";
import Step2 from "./Step2";

const theme = createTheme();

export default function Checkout() {
   const { color, font } = useContext(ThemeContext);

   const [activeStep, setActiveStep] = React.useState(0);

   const handleNext = () => {
      setActiveStep(activeStep + 1);
   };

   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <AppBar
            position="absolute"
            elevation={0}
            sx={{
               position: "relative",
               bgColor: color.primary,
               borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
         >
            <Toolbar>
               <Typography variant="h6" color="inherit" noWrap>
                  ERC System
               </Typography>
            </Toolbar>
         </AppBar>
         <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
               variant="outlined"
               sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
               <Typography component="h1" variant="h4" align="center">
                  Reset your password
               </Typography>
               <br />

               <React.Fragment>
                  {activeStep === 1 ? (
                     <Step2 />
                  ) : (
                     <React.Fragment>
                        <Step1 />
                        <Box
                           sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                           <Button sx={{ mt: 3, ml: 1 }}>Back</Button>
                           <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 3, ml: 1 }}
                           >
                              Continue
                           </Button>
                        </Box>
                     </React.Fragment>
                  )}
               </React.Fragment>
            </Paper>
         </Container>
      </ThemeProvider>
   );
}
