import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Container, Grid, Stack, Typography } from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Confirm
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"User Management of the ERC system"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function ControlledRadioButtonsGroup() {
  const [value, setValue] = React.useState("activate");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ mt: 0 }}>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <Stack direction="row" spacing={2}>
          <FormControlLabel
            value="activate"
            control={<Radio />}
            label="Activate"
          />
          <FormControlLabel
            value="deactivate"
            control={<Radio />}
            label="Deactivate"
          />
        </Stack>
      </RadioGroup>
    </FormControl>
  );
}

const currencies = [
  {
    value: "Applicant",
    label: "Applicant",
  },
  {
    value: "Secretary",
    label: "Secretary",
  },
  {
    value: "Reviewer",
    label: "Reviewer",
  },
  {
    value: "Clerk",
    label: "Clerk",
  },
];

export function SelectTextFields() {
  const [role, setRole] = React.useState("Applicant");

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-role"
          select
          label="User role"
          value={role}
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}

export default function UpdateUser() {
  return (
    <Container sx={{ mt: 2 }}>
      <Box>
        <Grid>
          <Grid>
            <Typography>
              <h3>Change the user role</h3>
            </Typography>
          </Grid>
          <Grid>
            <SelectTextFields />
          </Grid>
          <Grid>
            <Typography sx={{ mt: 4 }}>
              <h3>Activate or deactivate the user</h3>
            </Typography>
          </Grid>
          <Grid>
            <ControlledRadioButtonsGroup />
          </Grid>
          <Grid sx={{ mt: 4 }}>
            <AlertDialog />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
