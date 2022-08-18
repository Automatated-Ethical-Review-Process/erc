import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRef, useState } from "react";

export default function FormDialog({ label, onClick, disabled }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    onClick(ref.current.value);
    handleClose();
  };

  const ref = useRef();

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        onClick={handleOpen}
        disabled={disabled}
        fullWidth
      >
        {label}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reason for the decision</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your reasons here ...</DialogContentText>
          <TextField
            inputRef={ref}
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
