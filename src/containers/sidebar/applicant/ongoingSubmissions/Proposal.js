import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import BaseProposal from "components/proposals/Proposal";
import { useNavigate } from "react-router-dom";

export default function Proposal() {
  const navigate = useNavigate();
  return (
    <BaseProposal extraFields={{ status: "Status" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button variant="contained" onClick={() => navigate("new-version")}>
            Submit New Version
          </Button>
        </Grid>
      </Grid>
    </BaseProposal>
  );
}
