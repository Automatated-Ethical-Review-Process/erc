import { Button, Container, Grid } from "@mui/material";
import { useUpdateRolesMutation } from "api/auth/api";
import {
  useAcceptAppealMutation,
  useGetAppealQuery,
  useRejectAppealMutation,
} from "api/data/appeal";
import LoadingCircle from "components/common/LoadingCircle";
import TextField from "components/common/TextField";
import Roles, { getRoles } from "config/roles";
import useNotify from "hooks/useNotify";
import { useNavigate, useParams } from "react-router-dom";

function ReviewerRequest() {
  const { aid } = useParams();
  const navigate = useNavigate();

  const { data: appeal = {}, isLoading: isAppealLoading } =
    useGetAppealQuery(aid);
  const [acceptAppeal, { isLoading: isAcceptLoading }] =
    useAcceptAppealMutation();
  const [rejectAppeal, { isLoading: isRejectLoading }] =
    useRejectAppealMutation();

  const [updateRoles, { isLoading: isLoadingRoles }] = useUpdateRolesMutation();

  const isLoading =
    isAppealLoading || isAcceptLoading || isRejectLoading || isLoadingRoles;

  const { notify } = useNotify();

  const onAcceptSuccess = () =>
    acceptAppeal(appeal.id)
      .unwrap()
      .then(() => {
        notify("Request accepted", "success");
        navigate(-1, { replace: true });
      })
      .catch(({ data }) =>
        notify(data?.message || "Couldn't accept the request", "error")
      );

  const onAccept = () =>
    updateRoles({ id: appeal.applicantId, roles: getRoles(Roles.e_reviewer) })
      .unwrap()
      .then(onAcceptSuccess)
      .catch(({ data }) =>
        notify(data?.message || "Couldn't update the role", "error")
      );

  const onReject = () =>
    rejectAppeal(appeal.id)
      .unwrap()
      .then(() => {
        notify("Request rejected", "success");
        navigate(-1, { replace: true });
      })
      .catch(({ data }) =>
        notify(data?.message || "Couldn't reject the request", "error")
      );

  const data = [
    { label: "ID", value: appeal.id ?? "" },
    { label: "Name", value: appeal.name ?? "" },
    { label: "Status", value: appeal.status ?? "" },
    { label: "Message", value: appeal.message ?? "", multiline: true, rows: 4 },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <LoadingCircle isLoading={isLoading} />
      <Grid container spacing={4}>
        {data.map((item, id) => (
          <Grid key={id} item xs={12}>
            <TextField {...item} readOnly />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            fullWidth
            disabled={!appeal}
            variant="outlined"
            onClick={() => navigate(String(appeal.applicantId))}
          >
            View User
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            disabled={!appeal}
            variant="contained"
            onClick={onAccept}
            color="success"
          >
            Accept Request
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            disabled={!appeal}
            variant="contained"
            onClick={onReject}
            color="error"
          >
            Reject Request
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ReviewerRequest;
