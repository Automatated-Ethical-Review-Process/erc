import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Input = styled("input")({
  display: "none",
});

export default function RadioButtonsGroup() {
  const [open1, setOpenAccept] = React.useState(false);
  const handleClickOpen1 = () => {
    setOpenAccept(true);
  };
  const handleClose1 = () => {
    setOpenAccept(false);
  };
  return (
    <FormControl>
      <Typography variant="h5" color="red">
        Decision
      </Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="disapprove"
        name="radio-buttons-group"
        ml="2"
      >
        <FormControlLabel value="approve" control={<Radio />} label="Approve" />
        <FormControlLabel
          value="mj_modification"
          control={<Radio />}
          label="Major Modification"
        />
        <FormControlLabel
          value="mn_modification"
          control={<Radio />}
          label="Minor Modification"
        />
        <FormControlLabel
          value="disapprove"
          control={<Radio />}
          label="Disapprove"
        />
      </RadioGroup>
      <Typography variant="h5" color="red" my={2}>
        Overall Comment
      </Typography>
      <TextareaAutosize
        my={2}
        aria-label="minimum height"
        minRows={10}
        placeholder="add overall comment for the proposal"
        style={{ width: 600 }}
      />

      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
        />

        <Link href="#" underline="hover">
          {"Download the Evaluation Form"}
        </Link>

        <Stack direction="row" spacing={2} mt={3}>
          <Button variant="contained" component="span">
            Upload Form
          </Button>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleClickOpen1}
          >
            Submit
          </Button>
        </Stack>
      </label>

      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose1}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Review Submission"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to submit this review?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>
          <Button onClick={handleClose1}>Submit</Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
}
