import * as React from "react";

import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

import BaseUser from "components/users/user";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UserDetails() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BaseUser>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{ width: 120 }}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{ width: 120 }}
          >
            Accept
          </Button>
        </Stack>
      </BaseUser>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reviewer Request from Applicant"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
