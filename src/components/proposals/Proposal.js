import { useParams, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

import TextField from "components/common/TextField";
import { useGetProposalQuery } from "api/data/proposal";
import LoadingCircle from "components/common/LoadingCircle";

export default function Proposal({
  extraFields = { deadline: "Deadline" },
  children,
}) {
  const navigate = useNavigate();

  const { pid: proposalId } = useParams();

  const {
    data: rawData = {},
    error,
    isLoading,
  } = useGetProposalQuery(proposalId);

  // if (error) {
  //   return "invalid proposal id " + proposalId;
  // }
  // TODO: handle error

  const proposal = { ...rawData, user: rawData.user?.name };
  // TODO: add co-investigator

  const data = {
    name: "Proposal Name",
    type: "Type",
    date: "Date",
    time: "Time",
    ...extraFields,
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <LoadingCircle isLoading={isLoading} />
      <Grid container spacing={4}>
        {Object.entries(data).map(([key, label], id) => (
          <Grid key={id} item xs={12}>
            <TextField value={proposal[key] ?? ""} label={label} readOnly />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button variant="contained" onClick={() => navigate("versions")}>
            View Documents
          </Button>
        </Grid>
        <Grid item xs={12} />
      </Grid>
      {children}
    </Container>
  );
}
