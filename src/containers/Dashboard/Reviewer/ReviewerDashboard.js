import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { useNavigate } from "react-router-dom";

export default function FullWidthGrid() {
   const navigate = useNavigate();
   return (
      <Container sx={{ mt: 15 }}>
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} alignItems="center">
               <Grid item xs={12} md={6}>
                  <Button
                     variant="outlined"
                     size="large"
                     fullWidth
                     onClick={() => navigate("/reviewer/pending")}
                  >
                     Pending Proposals
                  </Button>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Button
                     variant="outlined"
                     size="large"
                     fullWidth
                     onClick={() => navigate("/reviewer/reviewing")}
                  >
                     Reviewing Proposals
                  </Button>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Button
                     variant="outlined"
                     size="large"
                     fullWidth
                     onClick={() => navigate("/reviewer/reviewed")}
                  >
                     Reviewed Proposals
                  </Button>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Button
                     variant="outlined"
                     size="large"
                     fullWidth
                     onClick={() => navigate("/reviewer/other")}
                  >
                     Other Proposals
                  </Button>
               </Grid>
               <Grid item xs={12} md={12}>
                  <Button
                     variant="outlined"
                     size="large"
                     fullWidth
                     onClick={() => navigate("/applicant")}
                  >
                     Switch to Applicant
                  </Button>
               </Grid>
            </Grid>
         </Box>
      </Container>
   );
}