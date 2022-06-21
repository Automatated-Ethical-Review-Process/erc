import { useState, forwardRef } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import BaseUndergraduate from "components/users/undergraduate";
import DeclineComments from "components/common/DeclineComment";

const Transition = forwardRef(function Transition(props, ref) {
   return <Slide direction="down" ref={ref} {...props} />;
});

export default function Undergraduate() {
   const [open, setOpenAccept] = useState(false);

   const handleClickOpen = () => {
      setOpenAccept(true);
   };

   const handleClose = () => {
      setOpenAccept(false);
   };

   return (
      <BaseUndergraduate>
         <Grid container spacing={4}>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={3}>
               <Button
                  variant="contained"
                  color="success"
                  onClick={handleClickOpen}
               >
                  Accept Request
               </Button>
            </Grid>
            <Grid item xs={12} md={3}>
               <DeclineComments label="Decline Request" />
            </Grid>
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
      </BaseUndergraduate>
   );
}
