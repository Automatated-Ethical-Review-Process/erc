import { forwardRef, useState } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import MenuItem from "@mui/material/MenuItem";
import useForm from "hooks/useForm";
import { yEmailSchema } from "utils/yup";
import Form from "components/common/Form";
import { TextFieldController } from "components/controllers";
import Roles from "config/roles";
import {
  useInviteClerkMutation,
  useInviteReviewerMutation,
  useInviteSecretaryMutation,
} from "api/auth/api";
import useNotify from "hooks/useNotify";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddReviewer() {
  const [data, setData] = useState(null);

  const [inviteClerk, { isLoading: isLoadingClerk }] = useInviteClerkMutation();
  const [inviteSecretary, { isLoading: isLoadingSecretary }] =
    useInviteSecretaryMutation();
  const [inviteReviewer, { isLoading: isLoadingReviewer }] =
    useInviteReviewerMutation();

  const isLoading = isLoadingClerk || isLoadingSecretary || isLoadingReviewer;

  const { notify } = useNotify();

  const handleClose = () => setData(null);
  const handleSend = () => {
    const { email, role } = data;
    let method = null;

    switch (role) {
      case Roles.clerk:
        method = inviteClerk;
        break;
      case Roles.secretary:
        method = inviteSecretary;
        break;
      case Roles.reviewer:
        method = inviteReviewer;
        break;
      default:
        throw new Error("Invalid role");
    }

    if (method) {
      method({ email })
        .unwrap()
        .then(({ token }) => {
          console.log(
            `${window.location.href
              .split("/")
              .slice(0, 3)
              .join("/")}/signup?token=${token}`
          );
          notify("Successfully invited", "success");
        })
        .catch(({ data }) => {
          notify(data?.message || "Something went wrong", "error");
        });
    }

    setData(null);
  };

  const { control, handleSubmit } = useForm(yEmailSchema);

  const onSubmit = (data) => setData(data);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Typography variant="body1" textAlign="center">
                Enter the email address and select the role of user to add to
                the system.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldController
                name="email"
                label="Email Address"
                control={control}
                autoComplete="email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldController
                name="role"
                label="Role"
                control={control}
                fullWidth
                select
                defaultValue={Roles.reviewer}
              >
                <MenuItem value={Roles.clerk}>Clerk</MenuItem>
                <MenuItem value={Roles.secretary}>Secretary</MenuItem>
                <MenuItem value={Roles.reviewer}>Reviewer</MenuItem>
              </TextFieldController>
            </Grid>
            <Grid item xs={12} md={12} textAlign="center">
              <Button
                disabled={isLoading}
                variant="contained"
                color="success"
                type="submit"
              >
                Send Invitation
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Paper>
      <Dialog
        open={!!data}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Send Invitation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to send invitation to user for sign up in to the system?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
