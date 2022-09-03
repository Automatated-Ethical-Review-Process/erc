import { useParams, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

import TextField from "components/common/TextField";
import { useGetProposalQuery } from "api/data/proposal";
import LoadingCircle from "components/common/LoadingCircle";
import { putIdName } from "utils/ids";

export default function Proposal({
  loading,
  extraFields = {},
  rightButton = null,
  children,
}) {
  const navigate = useNavigate();

  const { pid: proposalId } = useParams();

  const {
    data: rawData = {},
    error,
    isLoading,
  } = useGetProposalQuery(proposalId);

  if (error) {
    return "invalid proposal id " + proposalId;
  }

  if (rawData.name) {
    putIdName(proposalId, rawData.name);
  }

  const date = new Date(rawData.date);

  const proposal = {
    ...rawData,
    cis: rawData.cis?.map((i) => i.name).join(", "),
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };

  const data = {
    name: "Name",
    type: "Type",
    date: "Date",
    time: "Time",
    ...extraFields,
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <LoadingCircle isLoading={isLoading || loading} />
      <Grid container spacing={4}>
        {Object.entries(data).map(([key, label], id) => (
          <Grid key={id} item xs={12}>
            <TextField value={proposal[key] ?? ""} label={label} readOnly />
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate("versions")}
          >
            View Documents
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          {rightButton && (
            <Button fullWidth variant="contained" onClick={rightButton.onClick}>
              {rightButton.text}
            </Button>
          )}
        </Grid>

        {proposal.cv && (
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="outlined"
              color="warning"
              onClick={() => navigate(`doc-${proposal.cv}`)}
            >
              CV
            </Button>
          </Grid>
        )}
        {proposal.coverLetter && (
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="outlined"
              color="warning"
              onClick={() => navigate(`doc-${proposal.coverLetter}`)}
            >
              Cover Letter
            </Button>
          </Grid>
        )}
        {proposal.ercApprovedCertificates?.length > 0 && (
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="outlined"
              color="warning"
              onClick={() => navigate("erc-cert")}
            >
              ERC Approved Certificates
            </Button>
          </Grid>
        )}
        {proposal.trainCertificates?.length > 0 && (
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="outlined"
              color="warning"
              onClick={() => navigate("train-cert")}
            >
              Training Certificates
            </Button>
          </Grid>
        )}

        <Grid item xs={12} />
      </Grid>
      {children}
    </Container>
  );
}
