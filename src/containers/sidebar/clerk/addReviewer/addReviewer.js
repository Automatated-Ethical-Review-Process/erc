import * as React from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddReviewer() {
   const [open1, setOpenAccept] = React.useState(false);

   const handleClickOpen1 = () => {
      setOpenAccept(true);
   };
   const handleClose1 = () => {
      setOpenAccept(false);
   };

   return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
         <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
         >
            <Grid container space={3} sx={{ mt: 4 }}>
               <Grid>
                  <Typography variant="body1">
                     Enter the email address of reviewer to add to the system.
                  </Typography>
               </Grid>
               <Grid item xs={12} md={12}>
                  <Box
                     component="form"
                     sx={{
                        mt: 2,
                        width: 400,
                        maxWidth: "80%",
                     }}
                     noValidate
                     autoComplete="off"
                  >
                     <TextField
                        fullWidth
                        id="email-1"
                        label="Input Email Address"
                        variant="outlined"
                        required
                        sx={{
                           mt: 4,
                        }}
                     />
                  </Box>
               </Grid>
               <Grid container spacing={4}>
                  <Grid item xs={12} md={6}></Grid>
                  <Grid item xs={12} md={3}></Grid>
                  <Grid item xs={12} md={3}>
                     <Button
                        variant="contained"
                        color="success"
                        onClick={handleClickOpen1}
                     >
                        Add Reviewer
                     </Button>
                  </Grid>
               </Grid>
               <Dialog
                  open={open1}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose1}
               >
                  <DialogTitle>{"Add Reviewer"}</DialogTitle>
                  <DialogContent>
                     <DialogContentText id="alert-dialog-slide-description">
                        Do you want to add this reviewer to the system?
                     </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                     <Button onClick={handleClose1}>Cancel</Button>
                     <Button onClick={handleClose1}>Add</Button>
                  </DialogActions>
               </Dialog>
            </Grid>
         </Paper>
      </Container>
   );
}
