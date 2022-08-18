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
import {
  useSetVersionRejectedMutation,
  useSetVersionSubmittedMutation,
} from "api/data/version";
import { useNavigate, useParams } from "react-router-dom";
import useNotify from "hooks/useNotify";
import { useGetVersionsQuery } from "api/data/proposal";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function NewSubmission() {
  const { pid } = useParams();
  const { notify } = useNotify();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [accept, { isLoading: isAcceptLoading }] =
    useSetVersionSubmittedMutation();
  const [reject, { isLoading: isRejectLoading }] =
    useSetVersionRejectedMutation();
  const { data = [], isLoading: isVersionsLoading } = useGetVersionsQuery(pid);

  const isLoading = isAcceptLoading || isRejectLoading || isVersionsLoading;
  const vid = data.at(-1)?.id;

  const handleAccept = () => {
    accept({ pid, vid })
      .unwrap()
      .then(() => {
        notify("Successfully accepted", "success");
        navigate(-1, { replace: true });
      })
      .catch(({ data }) =>
        notify(data?.message ?? "Failed to accept", "error")
      );
    handleClose();
  };

  const handleDecline = (message) => {
    if (!message) {
      alert("Reason is required!");
    } else {
      reject({ pid, vid, message })
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
    <BaseProposal
      loading={isLoading}
      extraFields={{ pi: "PI", cis: "Co-Investigators" }}
      rightButton={{
        text: "Download payment slip",
        onClick: () => {}, // TODO: download payment slip
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={handleOpen}
          >
            Complete Submission
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <DeclineComments
            label="Incomplete submission"
            onClick={handleDecline}
            disabled={isLoading}
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
