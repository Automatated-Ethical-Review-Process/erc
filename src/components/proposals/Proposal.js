import * as React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { getProposal } from "services/proposalService";

import TextField from "components/common/TextField";

export default function Proposal(props) {
   const navigate = useNavigate();
   const { pathname } = useLocation();

   const { pid: proposalId } = useParams();
   const proposal = getProposal(proposalId);

   if (!proposal) {
      return "invalid proposal id " + proposalId;
   }

   return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
         <Grid container spacing={4}>
            <Grid item xs={12}>
               <TextField
                  label="Proposal Title"
                  value={proposal.name}
                  readOnly
               />
            </Grid>

            <Grid item xs={12}>
               <TextField label="Date" value={proposal.date} readOnly />
            </Grid>

            <Grid item xs={12}>
               <TextField label="Time" value={proposal.time} readOnly />
            </Grid>

            <Grid item xs={12}>
               <TextField label="Category" value={proposal.category} readOnly />
            </Grid>

            <Grid item xs={12}>
               <TextField label="Deadline" value={proposal.deadline} readOnly />
            </Grid>

            <Grid item xs={12}>
               <Button
                  variant="contained"
                  onClick={() => navigate(`${pathname}/versions`)}
               >
                  View Documents
               </Button>
            </Grid>
            <Grid item xs={12} />
         </Grid>
         {props.children}
      </Container>
   );
}
