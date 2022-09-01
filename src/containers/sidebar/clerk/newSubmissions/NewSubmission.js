import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";

import { useGetProposalQuery } from "api/data/proposal";
import {
  useGetLatestVersionQuery,
  useSetVersionRejectedMutation,
  useSetVersionSubmittedMutation,
} from "api/data/version";
import DeclineComments from "components/common/DeclineComment";
import BaseProposal from "components/proposals/Proposal";
import useDownload from "hooks/useDownload";
import useNotify from "hooks/useNotify";
import { useNavigate, useParams } from "react-router-dom";

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

  const { data: proposal = {}, isLoading: isProposalLoading } =
    useGetProposalQuery(pid);
  const { data: latestVersion = {}, isLoading: isVersionsLoading } =
    useGetLatestVersionQuery(pid);

  const paymentSlip = proposal.paymentSlip;
  const vid = latestVersion.id;

  const { download, isLoading: isFileLoading } = useDownload(paymentSlip);

  const isLoading =
    isAcceptLoading ||
    isRejectLoading ||
    isProposalLoading ||
    isVersionsLoading ||
    isFileLoading;

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

  const rightButton = paymentSlip
    ? { text: "Download payment slip", onClick: download }
    : null;

  return (
    <BaseProposal
      loading={isLoading}
      extraFields={{ pi: "PI", cis: "Co-Investigators" }}
      rightButton={rightButton}
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
