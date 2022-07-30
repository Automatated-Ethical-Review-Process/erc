import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { useInviteReviewerMutation } from "api/auth/api";
import { BasicForm } from "components/common/Form";
import { TextFieldController } from "components/controllers";
import useNotify from "hooks/useNotify";
import { forwardRef, useState } from "react";
import { yEmailSchema } from "utils/yup";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddReviewer() {
  const [data, setData] = useState(null);

  const handleClose = () => setData(null);
  const onSubmit = (data) => setData(data);

  const [invite, { isLoading }] = useInviteReviewerMutation();
  const { notify } = useNotify();

  const handleAdd = () => {
    invite(data)
      .unwrap()
      .then(() => notify("Successfully invited", "success"))
      .catch(({ data }) => notify(data?.message || "Error inviting", "error"));
    handleClose();
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <BasicForm schema={yEmailSchema} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1" textAlign="center">
                Enter the email address of reviewer to add to the system
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextFieldController
                name="email"
                label="Email Address"
                autoComplete="email"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button
                disabled={isLoading}
                variant="contained"
                color="success"
                type="submit"
              >
                Add Reviewer
              </Button>
            </Grid>
            <Dialog
              open={!!data}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
            >
              <DialogTitle>{"Add Reviewer"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Do you want to add this reviewer to the system?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAdd}>Add</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </BasicForm>
      </Paper>
    </Container>
  );
}
