import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';




export function FormControlLabelPosition(props) {
  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label={props.lbl}
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  );
}

const Input = styled('input')({
  display: 'none',
});

export function UploadButton(props) {
  return (
    <Stack direction="row" alignItems="center">
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="outlined" component="span" >
          {props.upload}
        </Button>
      </label>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span" >
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
        '& > :not(style)': { },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        sx={{width: {xs:'20vw',md:'60vw'} }}
        id="outlined-basic" 
        label={props.label} 
        variant="outlined" 
        size='small'
      />
    </Box>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {
  return (
      <Container>
        <Box sx={{ flexGrow: 1,mx:10,my:5 }} >
        <Grid container spacing={1} >
            <Grid item xs={12} md={12}>
                <BasicTextFields label="Proposal Name" />
            </Grid>
            <Grid item xs={12} md={12}>
                <BasicTextFields label="Proposal Type" />
            </Grid>
            <Grid item xs={12} md={12}>
                <BasicTextFields label="Co-Investigators" />
            </Grid>
            <Grid item xs={12} md={12}>
                <UploadButton upload="Upload the application form"/>
            </Grid>
            <Grid item xs={12} md={12}>
                <UploadButton upload="Upload the proposal"/>
            </Grid>
            <Grid item xs={12} md={12}>
                <Stack direction="row" spacing={2}>
                    <FormControlLabelPosition lbl="Has cover letter?"/>
                    <UploadButton upload="Upload"/>
                </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
                <Stack direction="row" spacing={2}>
                    <FormControlLabelPosition lbl="Has CV?"/>
                    <UploadButton upload="Upload"/>
                </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
                <Stack direction="row" spacing={2}>
                    <FormControlLabelPosition lbl="Has training certificate?"/>
                    <UploadButton upload="Upload"/>
                </Stack>
            </Grid>
            <Grid item xs={3} md={4}>
                <Typography varient={"h6"}>Upload the supplementary</Typography>
            </Grid>
            <Grid item xs={6} md={8}>
            
            </Grid>
        </Grid>
        </Box>
    </Container>    
  );
}
