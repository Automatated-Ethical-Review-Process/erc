import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";

import DeclineComments from "components/common/DeclineComment";
import BaseProposal from "components/proposals/Proposal";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function NewSubmission() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    // TODO: endpoint required
    handleClose();
  };

  const handleDecline = (reason) => {
    // TODO: endpoint required
  };

  return (
    <BaseProposal
      extraFields={{ user: "PI", coInvestigators: "Co-Investigators" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="outlined">Download payment slip</Button>
        </Grid>
        <Grid item xs={12} md={4} />
        <Grid item xs={12} md={4} textAlign="right">
          <Button variant="contained" color="success" onClick={handleOpen}>
            Complete Submission
          </Button>
        </Grid>
        <Grid item xs={12} md={4} textAlign="right">
          <DeclineComments
            label="Incomplete submission"
            onClick={handleDecline}
          />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Accept the Proposal"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to accept this proposal as complete submission and send
            it to the secretary?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAccept}>Accept</Button>
        </DialogActions>
      </Dialog>
    </BaseProposal>
  );
}
