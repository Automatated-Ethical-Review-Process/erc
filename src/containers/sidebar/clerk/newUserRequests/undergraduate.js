import * as React from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import BaseUndergraduate from "components/users/undergraduate";

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="down" ref={ref} {...props} />;
});

export default function Undergraduate() {
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
      <BaseUndergraduate>
         <Grid container spacing={4}>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={3}>
               <Button
                  variant="contained"
                  color="success"
                  onClick={handleClickOpen1}
               >
                  Accept Request
               </Button>
            </Grid>
            <Grid item xs={12} md={3}>
               <Button
                  variant="contained"
                  color="error"
                  onClick={handleClickOpen2}
               >
                  Decline Request
               </Button>
            </Grid>
         </Grid>
         <Dialog
            open={open1}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose1}
            aria-describedby="alert-dialog-slide-description"
         >
            <DialogTitle>{"Accept the User Request"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                  Do you want to add this user to the system?
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
            aria-describedby="alert-dialog-slide-description"
         >
            <DialogTitle>{"Decline the User Request"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                  Do you want to decline this user?
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose2}>Cancel</Button>
               <Button onClick={handleClose2}>Decline</Button>
            </DialogActions>
         </Dialog>
      </BaseUndergraduate>
   );
}
