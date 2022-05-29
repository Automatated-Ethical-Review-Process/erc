import { useState } from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Step1 from "./Step1";
import Step2 from "./Step2";

export default function ForgotPassword() {
   const [activeStep, setActiveStep] = useState(0);

   const handleNext = () => {
      setActiveStep(activeStep + 1);
   };

   return (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
         <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
         >
            <Typography component="h1" variant="h4" align="center">
               Reset your password
            </Typography>
            <br />

            <>
               {activeStep === 1 ? (
                  <Step2 />
               ) : (
                  <>
                     <Step1 />
                     <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button sx={{ mt: 3, ml: 1 }}>Back</Button>
                        <Button
                           variant="contained"
                           onClick={handleNext}
                           sx={{ mt: 3, ml: 1 }}
                        >
                           Continue
                        </Button>
                     </Box>
                  </>
               )}
            </>
         </Paper>
      </Container>
   );
}
