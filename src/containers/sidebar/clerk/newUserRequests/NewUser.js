import { forwardRef, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";

import DeclineComments from "components/common/DeclineComment";
import User from "components/users/user";
import {
  useSetUserUnverifiedMutation,
  useSetUserVerifiedMutation,
} from "api/auth/api";
import { useNavigate, useParams } from "react-router-dom";
import useNotify from "hooks/useNotify";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function NewUser() {
  const navigate = useNavigate();
  const { uid: userId } = useParams();

  const [open, setOpen] = useState(false);

  const [verify, { isLoading: isLoadingVerify }] = useSetUserVerifiedMutation();
  const [unVerify, { isLoading: isLoadingUnVerify }] =
    useSetUserUnverifiedMutation();

  const isLoading = isLoadingVerify || isLoadingUnVerify;

  const { notify } = useNotify();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAccept = () => {
    verify(userId)
      .unwrap()
      .then(() => {
        navigate(-1, { replace: true });
        notify("User verified", "success");
      })
      .catch(({ data }) =>
        notify(data?.message || "Something went wrong", "error")
      );
    handleClose();
  };

  const handleDecline = (message) => {
    if (!message) {
      alert("Reason is required!");
    } else {
      unVerify({ id: userId, message })
        .unwrap()
        .then(() => {
          notify("Successfully declined", "success");
          navigate(-1, { replace: true });
        })
        .catch(({ data }) =>
          notify(data?.message || "Failed to decline", "error")
        );
    }
  };

  return (
    <User>
      <Grid item xs={12} md={6} />
      <Grid item xs={12} md={3} textAlign="right">
        <Button
          variant="contained"
          color="success"
          onClick={handleOpen}
          disabled={isLoading}
        >
          Accept Request
        </Button>
      </Grid>
      <Grid item xs={12} md={3} textAlign="right">
        <DeclineComments
          label="Decline Request"
          onClick={handleDecline}
          disabled={isLoading}
        />
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Accept the User Request"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to add this user to the system?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAccept}>Accept</Button>
        </DialogActions>
      </Dialog>
    </User>
  );
}
