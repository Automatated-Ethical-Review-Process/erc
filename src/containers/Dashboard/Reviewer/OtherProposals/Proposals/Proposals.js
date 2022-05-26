import * as React from "react";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

import ReadOnlyTextField from "../../../../../components/common/ReadOnlyTextField";

export default function OtherProposals() {
   const location = useLocation();
   const proposal = location.state;

   if (!proposal) {
      return "invalid data";
   }

   return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
               <Grid item xs={12}>
                  <ReadOnlyTextField
                     label="Proposal Title"
                     value={proposal.name}
                  />
               </Grid>

               <Grid item xs={12}>
                  <ReadOnlyTextField label="Date" value={proposal.date} />
               </Grid>

               <Grid item xs={12}>
                  <ReadOnlyTextField label="Time" value={proposal.time} />
               </Grid>

               <Grid item xs={12}>
                  <ReadOnlyTextField
                     label="Category"
                     value={proposal.category}
                  />
               </Grid>

               <Grid item xs={12}>
                  <ReadOnlyTextField
                     label="Deadline"
                     value={proposal.deadline}
                  />
               </Grid>

               <Grid item xs={12}>
                  <Button variant="contained">View Documents</Button>
               </Grid>
            </Grid>
         </Box>
      </Container>
   );
}
