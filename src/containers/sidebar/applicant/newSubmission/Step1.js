import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";

const currencies = [
  {
    value: "Human Research",
    label: "Human Research",
  },
  {
    value: "Animal Research",
    label: "Animal Research",
  },
];

export function SelectTextFields(props) {
  const [currency, setCurrency] = React.useState("Human Research");

  const handleChange = (event) => {
    setCurrency(event.target.value);
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
          id="outlined-select-currency"
          select
          label={props.label}
          value={currency}
          onChange={handleChange}
          size="small"
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

export function FormControlLabelPosition(props) {
  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          sx={{ ml: 0 }}
          value="start"
          control={
            <Switch
              color="primary"
              onChange={() => props.setSwitch(!props.defaultValue)}
            />
          }
          label={props.lbl}
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  );
}

const Input = styled("input")({
  display: "none",
});

export function UploadButton(props) {
  return (
    <Stack direction="row" alignItems="center">
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
        />
        <Button variant="outlined" component="span">
          {props.upload}
        </Button>
      </label>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <DriveFolderUploadIcon />
        </IconButton>
      </label>
    </Stack>
  );
}

export function BasicTextFields(props) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={props.label}
        variant="outlined"
        size="small"
      />
    </Box>
  );
}

export default function FullWidthGrid() {
  const [hasCoverLetter, setHasCoverLetter] = useState(false);
  const [hasCV, setHasCV] = useState(false);
  const [hasTrainingCertificate, setHasTrainingCertificate] = useState(false);
  const [hasOtherApproved, setHasOtherApproved] = useState(false);
  return (
    <Container maxWidth="md">
      <Box sx={{ flexGrow: 1, my: 5 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <BasicTextFields label="Proposal Name" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <SelectTextFields label="Proposal Type" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <BasicTextFields label="Co-Investigators" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <UploadButton upload="Upload the application form" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <UploadButton upload="Upload the proposal" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <UploadButton upload="Upload the supplementary" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Stack direction="row" spacing={2}>
              <FormControlLabelPosition
                lbl="Has cover letter?"
                setSwitch={setHasCoverLetter}
                defaultValue={hasCoverLetter}
              />
              {hasCoverLetter && <UploadButton upload="Upload" />}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Stack direction="row" spacing={2}>
              <FormControlLabelPosition
                lbl="Has CV?"
                setSwitch={setHasCV}
                defaultValue={hasCV}
              />
              {hasCV && <UploadButton upload="Upload" />}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Stack direction="row" spacing={2}>
              <FormControlLabelPosition
                lbl="Has training certificate?"
                setSwitch={setHasTrainingCertificate}
                defaultValue={hasTrainingCertificate}
              />
              {hasTrainingCertificate && <UploadButton upload="Upload" />}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Stack direction="row" spacing={2}>
              <FormControlLabelPosition
                lbl="Has any other ERC approved this project?"
                setSwitch={setHasOtherApproved}
                defaultValue={hasOtherApproved}
              />
              {hasOtherApproved && <UploadButton upload="Upload" />}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
