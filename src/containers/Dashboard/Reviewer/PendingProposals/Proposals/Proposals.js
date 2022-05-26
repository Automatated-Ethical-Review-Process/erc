import * as React from "react";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import ReadOnlyTextField from "../../../../../components/common/ReadOnlyTextField";

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="down" ref={ref} {...props} />;
});

export default function Proposals() {
   const [open1, setOpenAccept] = React.useState(false);
   const [open2, setOpenDecline] = React.useState(false);

   const location = useLocation();
   const proposal = location.state;

   if (!proposal) {
      return "invalid data";
   }

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
      <Container maxWidth="md" sx={{ mt: 4 }}>
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
               <Grid item xs={12}>
                  <ReadOnlyTextField
                     label="Proposal Title"
                     value={proposal.name}
                  />
               </Grid>

               <Grid item xs={12}>
                  <ReadOnlyTextField label="Date" value={proposal.date} />
               </Grid>

               <Grid item xs={12}>
                  <ReadOnlyTextField label="Time" value={proposal.time} />
               </Grid>

               <Grid item xs={12}>
                  <ReadOnlyTextField
                     label="Category"
                     value={proposal.category}
                  />
               </Grid>

               <Grid item xs={12}>
                  <ReadOnlyTextField
                     label="Deadline"
                     value={proposal.deadline}
                  />
               </Grid>

               <Grid item xs={12}>
                  <Button variant="contained">View Documents</Button>
               </Grid>
               <Grid item xs={12} md={6}></Grid>
               <Grid item xs={12} md={3}>
                  <Button
                     variant="contained"
                     color="success"
                     onClick={handleClickOpen1}
                  >
                     Accept Proposal{" "}
                  </Button>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Button
                     variant="contained"
                     color="error"
                     onClick={handleClickOpen2}
                  >
                     Decline Proposal
                  </Button>
               </Grid>
            </Grid>
         </Box>
         <div>
            <Dialog
               open={open1}
               TransitionComponent={Transition}
               keepMounted
               onClose={handleClose1}
               aria-describedby="alert-dialog-slide-description"
            >
               <DialogTitle>{"Accept the Proposal"}</DialogTitle>
               <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                     Do you want to accept this proposal to review?
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose1}>Cansel</Button>
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
               <DialogTitle>{"Decline the Proposal"}</DialogTitle>
               <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                     Do you want to decline this proposal?
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose2}>Cansel</Button>
                  <Button onClick={handleClose2}>Decline</Button>
               </DialogActions>
            </Dialog>
         </div>
      </Container>
   );
}
