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

function Proposal({ id }) {
  const proposal = getProposal(id);
  const location = useLocation();
  const navigate = useNavigate();

  if (!proposal) {
    return "invalid proposal id: " + id;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container direction="column" spacing={2}>
        <Grid item container>
          <Grid item xs={2} md={2}>
            <Typography>Proposal Name :</Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Item>
              <Typography>{proposal.name}</Typography>
            </Item>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={2} md={2}>
            <Typography>Proposal Type :</Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Item>
              <Typography>{proposal.category}</Typography>
            </Item>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={2} md={2}>
            <Typography>Submitted Date :</Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Item>
              <Typography>{proposal.date}</Typography>
            </Item>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={2} md={2}>
            <Typography>Status :</Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Item>
              <Typography>{proposal.status}</Typography>
            </Item>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ borderBottomWidth: 5 }} />
      </Grid>
      <Grid item xs={12} container sx={{ mt: 2 }}>
        <Button onClick={() => navigate(location.pathname + "/versions")}>
          View Document
        </Button>
      </Grid>
    </Grid>
  );
}

function GetView() {
  const onclick = useNavigate();
  const location = useLocation();
  const { pid } = useParams();

  if (pid) {
    return <Proposal id={pid} />;
  }

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
