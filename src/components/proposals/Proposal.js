import * as React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { getProposal } from "services/data/proposalService";

import TextField from "components/common/TextField";

export default function Proposal({
   extraFields = { deadline: "Deadline" },
   children,
}) {
   const navigate = useNavigate();
   const { pathname } = useLocation();

   const { pid: proposalId } = useParams();
   const proposal = getProposal(proposalId);

   if (!proposal) {
      return "invalid proposal id " + proposalId;
   }

   const data = {
      id: "Proposal ID",
      name: "Proposal Name",
      date: "Date",
      time: "Time",
      category: "Category",
      ...extraFields,
   };

   return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
         <Grid container spacing={4}>
            {Object.entries(data).map(([key, label], id) => (
               <Grid key={id} item xs={12}>
                  <TextField value={proposal[key]} label={label} readOnly />
               </Grid>
            ))}

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
         {children}
      </Container>
   );
}
