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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function NewUser() {
  const [open, setOpenAccept] = useState(false);

  const handleClickOpen = () => {
    setOpenAccept(true);
  };

  const handleClose = () => {
    setOpenAccept(false);
  };

  return (
    <User>
      <Grid item xs={12} md={6} />
      <Grid item xs={12} md={3} textAlign="right">
        <Button variant="contained" color="success" onClick={handleClickOpen}>
          Accept Request
        </Button>
      </Grid>
      <Grid item xs={12} md={3} textAlign="right">
        <DeclineComments label="Decline Request" />
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
          <Button onClick={handleClose}>Accept</Button>
        </DialogActions>
      </Dialog>
    </User>
  );
}
