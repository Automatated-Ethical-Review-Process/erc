import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

import { getProposals } from "services/proposalService";

import DataGrid from "components/common/DataGrid";

function GetView() {
  const onclick = useNavigate();
  const location = useLocation();

  const proposals = getProposals();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DataGrid
          fields={["name", "date", "status"]}
          headerNames={["Proposal Name", "Submitted Date", "Status"]}
          rows={proposals}
          onRowClick={(row) => onclick(location.pathname + "/" + row.id)}
        />
      </Grid>
    </Grid>
  );
}

export default function ShowStatus() {
  return (
    <Container>
      <Box sx={{ flexGrow: 1, mt: 5 }}>
        <GetView />
      </Box>
    </Container>
  );
}
