import { Container, Grid, Typography } from "@mui/material";

import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  useGetStatusByIdQuery,
  useToggleUserEnabledMutation,
  useToggleUserLockedMutation,
  useUpdateRolesMutation,
} from "api/auth/api";
import { useGetUserQuery } from "api/data/user";
import Form from "components/common/Form";
import LoadingCircle from "components/common/LoadingCircle";
import { SelectController, SwitchController } from "components/controllers";
import Roles, { getRoles } from "config/roles";
import useForm from "hooks/useForm";
import useNotify from "hooks/useNotify";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { yEmptySchema } from "utils/yup";

export default function UpdateUser() {
  const [data, setData] = useState(null);
  const { uid: userId } = useParams();

  const { data: user = {}, isLoading: isLoadingUser } = useGetUserQuery(userId);
  const { data: status = {}, isLoading: isLoadingStatus } =
    useGetStatusByIdQuery(userId);

  const [toggleEnable, { isLoading: isLoadingEnable }] =
    useToggleUserEnabledMutation();
  const [toggleLock, { isLoading: isLoadingLock }] =
    useToggleUserLockedMutation();
  const [updateRoles, { isLoading: isLoadingRoles }] = useUpdateRolesMutation();

  const isLoading =
    isLoadingUser ||
    isLoadingStatus ||
    isLoadingEnable ||
    isLoadingLock ||
    isLoadingRoles;

  const role = user.roles?.includes(Roles.secretary)
    ? Roles.secretary
    : user.roles?.includes(Roles.e_reviewer)
    ? Roles.e_reviewer
    : user.roles?.includes(Roles.i_reviewer)
    ? Roles.i_reviewer
    : user.roles?.includes(Roles.clerk)
    ? Roles.clerk
    : Roles.applicant;

  const onSubmit = (data) => {
    const obj = {};
    if (data.enabled !== status.isEnable) {
      obj.toggleEnable = true;
    }
    if (data.locked !== status.isLocked) {
      obj.toggleLocked = true;
    }
    if (data.role !== role) {
      obj.roles = getRoles(data.role);
    }
    if (Object.keys(obj).length > 0) {
      setData(obj);
    } else {
      alert("No changes detected");
    }
  };

  const { notify } = useNotify();

  const handleClose = () => setData(null);

  const handleYes = () => {
    const promises = [];
    if (data.toggleEnable) {
      promises.push(toggleEnable(userId).unwrap());
    }
    if (data.toggleLocked) {
      promises.push(toggleLock(userId).unwrap());
    }
    if (data.roles) {
      promises.push(updateRoles({ id: userId, roles: data.roles }).unwrap());
    }
    Promise.all(promises)
      .then(() => notify("Successfully updated", "success"))
      .catch(({ data }) =>
        notify(data?.message || "Something went wrong", "error")
      );
    handleClose();
  };

  const defaultValues = useMemo(
    () => ({
      role,
      enabled: status.isEnable ?? false,
      locked: status.isLocked ?? false,
    }),
    [status, role]
  );

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm(yEmptySchema);

  useEffect(() => {
    if (Object.keys(user).length > 0 && Object.keys(status).length > 0) {
      reset(defaultValues);
    }
  }, [user, status, defaultValues, reset]);

  return (
    <Container sx={{ mt: 2 }}>
      <LoadingCircle isLoading={isLoading} />
      <Form
        schema={yEmptySchema}
        defaultValues={defaultValues}
        control={control}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Change user role</Typography>
          </Grid>
          <Grid item xs={12}>
            <SelectController
              name="role"
              label="Role"
              fullWidth
              options={[
                { label: "Applicant", value: Roles.applicant },
                { label: "Clerk", value: Roles.clerk },
                { label: "Internal Reviewer", value: Roles.i_reviewer },
                { label: "External Reviewer", value: Roles.e_reviewer },
                { label: "Secretary", value: Roles.secretary },
              ]}
            />
          </Grid>
          <Grid item xs={12} mt={3}>
            <Typography variant="subtitle1">Enable or Disable user</Typography>
          </Grid>
          <Grid item xs={12}>
            <SwitchController
              name="enabled"
              trueLabel="Enabled"
              falseLabel="Disabled"
            />
          </Grid>
          <Grid item xs={12} mt={3}>
            <Typography variant="subtitle1">Lock or Unlock user</Typography>
          </Grid>
          <Grid item xs={12}>
            <SwitchController
              name="locked"
              trueLabel="Locked"
              falseLabel="Unlocked"
            />
          </Grid>
          <Grid item xs={12} mt={3}>
            <Button variant="contained" type="submit" disabled={!isDirty}>
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Form>
      <Dialog open={!!data} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"User Management of the ERC system"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleYes} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
