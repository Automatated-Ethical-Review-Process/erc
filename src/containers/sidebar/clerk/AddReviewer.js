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
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1" textAlign="center">
              Enter the email address of reviewer to add to the system
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button
              variant="contained"
              color="success"
              onClick={handleClickOpen1}
            >
              Add Reviewer
            </Button>
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
