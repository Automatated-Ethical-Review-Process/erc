import { useNavigate, useParams } from "react-router-dom";

import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useGetProposalQuery } from "api/data/proposal";
import LoadingCircle from "components/common/LoadingCircle";
import TextField from "components/common/TextField";
import useIds from "hooks/useIds";
import { putIdName } from "utils/ids";
import useUser from "hooks/useUser";
import Roles from "config/roles";

export default function Proposal({
  loading,
  extraFields = {},
  rightButton = null,
  children,
}) {
  const setIds = useIds();
  const navigate = useNavigate();
  const { roles } = useUser();

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
    putIdName(proposalId, rawData.name, setIds);
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

  const viewUser = (
    <Button
      fullWidth
      variant="outlined"
      onClick={() => navigate(proposal.piid)}
    >
      View User
    </Button>
  );

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
          {rightButton ? (
            <Button fullWidth variant="contained" onClick={rightButton.onClick}>
              {rightButton.text}
            </Button>
          ) : (
            viewUser
          )}
        </Grid>

        {rightButton &&
          !roles.includes(Roles.reviewer) &&
          !roles.includes(Roles.applicant) && (
            <Grid item xs={12} md={6}>
              {viewUser}
            </Grid>
          )}
        {proposal.cv && !roles.includes(Roles.reviewer) && (
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
        {proposal.coverLetter && !roles.includes(Roles.reviewer) && (
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
        {proposal.ercApprovedCertificates?.length > 0 &&
          !roles.includes(Roles.reviewer) && (
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="outlined"
                color="warning"
                onClick={() => navigate("t-erc-cert")}
              >
                ERC Approved Certificates
              </Button>
            </Grid>
          )}
        {proposal.trainCertificates?.length > 0 &&
          !roles.includes(Roles.reviewer) && (
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="outlined"
                color="warning"
                onClick={() => navigate("t-train-cert")}
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
