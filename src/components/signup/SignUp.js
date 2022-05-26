import * as React from "react";
import { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { ThemeContext } from "../../context/ThemeContext";

const steps = ["Step 1", "Step 2", "Step 3"];

function getStepContent(step) {
   switch (step) {
      case 0:
         return <Step1 />;
      case 1:
         return <Step2 />;
      case 2:
         return <Step3 />;
      default:
         throw new Error("Unknown step");
   }
}

const themeApp = createTheme();

export default function Checkout() {
   const { theme } = useContext(ThemeContext);

   const [activeStep, setActiveStep] = React.useState(0);

   const handleNext = () => {
      setActiveStep(activeStep + 1);
   };

   const handleBack = () => {
      setActiveStep(activeStep - 1);
   };

   return (
      <ThemeProvider theme={themeApp}>
         <CssBaseline />
         <AppBar
            position="absolute"
            elevation={0}
            sx={{
               position: "relative",
               bgColor: theme.color.primary,
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
                  Registration
               </Typography>
               <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                  {steps.map((label) => (
                     <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                     </Step>
                  ))}
               </Stepper>
               <React.Fragment>
                  {activeStep === steps.length ? (
                     <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                           Your account has been created successfully.
                        </Typography>
                        <Typography variant="subtitle1">
                           We’ve sent an email to test@email.com. Please check
                           the email and follow the directions to verify your
                           email address.
                        </Typography>
                     </React.Fragment>
                  ) : (
                     <React.Fragment>
                        {getStepContent(activeStep)}
                        <Box
                           sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                           {activeStep !== 0 && (
                              <Button
                                 onClick={handleBack}
                                 sx={{ mt: 3, ml: 1 }}
                              >
                                 Back
                              </Button>
                           )}

                           <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 3, ml: 1 }}
                           >
                              {activeStep === steps.length - 1
                                 ? "Register"
                                 : "Next"}
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
