import * as React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

import { getProposal } from "../../../../../services/proposalService";
import ReadOnlyTextField from "../../../../../components/common/ReadOnlyTextField";

export default function ReviewedProposals() {
   const navigate = useNavigate();
   const location = useLocation();
   const { id: proposalId } = useParams();
   const proposal = getProposal(proposalId);

   if (!proposal) {
      return "invalid proposal id " + proposalId;
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
                  <Button
                     variant="contained"
                     onClick={() => navigate(`${location.pathname}/versions`)}
                  >
                     View Documents
                  </Button>
               </Grid>
            </Grid>
         </Box>
      </Container>
   );
}
