import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import BaseProposal from "components/proposals/Proposal";

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="down" ref={ref} {...props} />;
});

export default function Documents() {
   const [open1, setOpenAccept] = React.useState(false);
   const [open2, setOpenDecline] = React.useState(false);

   const handleClickOpen1 = () => {
      setOpenAccept(true);
   };
   const handleClickOpen2 = () => {
      setOpenDecline(true);
   };
   const handleClose1 = () => {
      setOpenAccept(false);
   };
   const handleClose2 = () => {
      setOpenDecline(false);
   };
   return (
      <BaseProposal
         extraFields={{ pi: "PI", coInvestigators: "Co-Investigators" }}
      >
         <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
               <Link href="#" underline="hover" color="#8854d0">
                  {"Download the payment slip"}
               </Link>
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4}>
               <Button
                  variant="contained"
                  color="success"
                  onClick={handleClickOpen1}
               >
                  Complete Submission
               </Button>
            </Grid>
            <Grid item xs={12} md={4}>
               <Button
                  variant="contained"
                  color="error"
                  onClick={handleClickOpen2}
               >
                  Incomplete Submission
               </Button>
            </Grid>
         </Grid>
         <Dialog
            open={open1}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose1}
         >
            <DialogTitle>{"Accept the Proposal"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                  Do you want to accept this proposal as complete submission and
                  send it to the secretary?
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose1}>Cancel</Button>
               <Button onClick={handleClose1}>Accept</Button>
            </DialogActions>
         </Dialog>
         <Dialog
            open={open2}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose2}
         >
            <DialogTitle>{"Decline the Proposal"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                  Do you want to decline this proposal and notify applicant as
                  incomplete submission?
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose2}>Cancel</Button>
               <Button onClick={handleClose2}>Decline</Button>
            </DialogActions>
         </Dialog>
      </BaseProposal>
   );
}
