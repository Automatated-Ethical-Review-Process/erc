import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Container, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getProposal, getProposals } from "services/proposalService";

import DataGrid from "components/common/DataGrid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function GetView() {
  const onclick = useNavigate();
  const location = useLocation();
  const { pid } = useParams();

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
