import { useState, forwardRef } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import BaseProposal from "components/proposals/Proposal";
import DeclineComments from "components/common/DeclineComment";
import useNotify from "hooks/useNotify";
import {
  useAcceptReviewerProposalMutation,
  useRejectReviewerProposalMutation,
} from "api/data/review";
import useUser from "hooks/useUser";
import { useGetVersionsQuery } from "api/data/proposal";
import { useNavigate, useParams } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Proposal() {
  const navigate = useNavigate();
  const [open, setOpenAccept] = useState(false);

  const handleOpen = () => setOpenAccept(true);
  const handleClose = () => setOpenAccept(false);

  const { notify } = useNotify();

  const [accept, { isLoading: isAcceptLoading }] =
    useAcceptReviewerProposalMutation();
  const [reject, { isLoading: isRejectLoading }] =
    useRejectReviewerProposalMutation();

  const { id: rid } = useUser();
  const { pid } = useParams();

  const { data = [], isLoading: isVersionLoading } = useGetVersionsQuery(pid);

  // TODO: handle error

  const vid = data.at(-1)?.id;

  // TODO: what if no version?

  const isLoading = isAcceptLoading || isRejectLoading || isVersionLoading;

  const handleAccept = () => {
    accept({ pid, vid, rid })
      .unwrap()
      .then(() => {
        notify("Proposal accepted", "success");
        navigate(-1, { replace: true });
      })
      .catch(({ data }) =>
        notify(data?.message || "Proposal could not be accepted", "error")
      );
    handleClose();
  };

  const handleDecline = (message) => {
    if (!message) {
      alert("Please enter a reason for declining this proposal");
    } else {
      reject({ pid, vid, rid, message })
        .unwrap()
        .then(() => {
          notify("Proposal declined", "success");
          navigate(-1, { replace: true });
        })
        .catch(({ data }) =>
          notify(data?.message || "Proposal could not be declined", "error")
        );
    }
  };

  return (
    <BaseProposal loading={isLoading}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} />
        <Grid item xs={12} md={3}>
          <Button variant="contained" color="success" onClick={handleOpen}>
            Accept Proposal
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <DeclineComments label="Decline Proposal" onClick={handleDecline} />
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
            Do you want to accept this proposal to review?
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
