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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Grid container space={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={12}>
            <Typography variant="body1">
              Enter the email address and select the role of user to add to the
              system.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} sx={{ my: 2 }}>
            <TextField
              id="email-1"
              label="Enter Email Address"
              variant="outlined"
              sx={{
                width: 250,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3} sx={{ my: 2 }}>
            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  sx={{ width: 120 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Role"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Secratary</MenuItem>
                  <MenuItem value={20}>Clerk</MenuItem>
                  <MenuItem value={30}>Reviewer</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}></Grid>
          <Grid item xs={12} md={12}>
            <Button
              variant="contained"
              color="success"
              onClick={handleClickOpen1}
            >
              Send Invitaion
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose1}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Send Invitation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to send invitation to user for sign up in to the system?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>
          <Button onClick={handleClose1}>Send</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
