import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: "center",
   color: theme.palette.text.secondary,
}));

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
                     onClick={() => navigate("/clerk/new-user-requests")}
                  >
                     New User Requests
                  </Button>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Button
                     variant="outlined"
                     size="large"
                     fullWidth
                     onClick={() => navigate("/clerk/current-users")}
                  >
                     Current Users
                  </Button>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Button
                     variant="outlined"
                     size="large"
                     fullWidth
                     onClick={() => navigate("/clerk/new-submissions")}
                  >
                     New Submissions
                  </Button>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Button
                     variant="outlined"
                     size="large"
                     fullWidth
                     onClick={() => navigate("/clerk/current-proposals")}
                  >
                     Current Proposals
                  </Button>
               </Grid>
            </Grid>
         </Box>
      </Container>
   );
}
