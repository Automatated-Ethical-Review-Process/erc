import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export function BasicButtons(props) {
  return (
    
      <Button variant="outlined" sx={{width: {xs:'50%',md:'50%'} }}>{props.label1}</Button>
    
  );
}

export function BasicTextFields(props) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': {width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        size='small'
        id="outlined-read-only-input"
        label={props.label}
        defaultValue="Hello World"
        InputProps={{
            readOnly: true,
        }} />
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

export default function BasicGrid() {
  return (
      <Container>
        <Box sx={{ flexGrow: 1, mx:10,my:7 }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <BasicTextFields label="Proposal Name"/>
                </Grid>
                <Grid item xs={12}>
                    <BasicTextFields label="Proposal Type"/>
                </Grid>
                <Grid item xs={12}>
                    <BasicTextFields label="Submitted Date"/>
                </Grid>
                <Grid item xs={12}>
                    <BasicTextFields label="Duration"/>
                </Grid>
                <Grid item xs={12}>
                    <BasicTextFields label="Status"/>
                </Grid>
            </Grid>
        </Box>

        <Box sx={{ flexGrow: 1, mx:10,mt:6 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Stack spacing={2} direction="row">
                    <BasicButtons label1="Submit New Version"/>
                    <BasicButtons label1="View Document"/>
                </Stack>
                </Grid>
                <Grid item xs={12}>
                <Stack spacing={2} direction="row">
                    <BasicButtons label1="Attach Progress Report"/>
                    <BasicButtons label1="Attach Final Report"/>
                </Stack>
                </Grid>
            </Grid>
        </Box>
      </Container>
  );
}