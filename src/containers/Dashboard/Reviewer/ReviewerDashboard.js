import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function FullWidthGrid() {
  return (
    <Container sx={
        { mt:15}
        }>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignItems="center" >
        <Grid item xs={12} md={6}>
        <Button variant="outlined" size="large" fullWidth >
          Pending Proposals
        </Button>
        </Grid>
        <Grid item xs={12} md={6}>
        <Button variant="outlined" size="large" fullWidth >
          Reviewing Proposals
        </Button>
        </Grid>
        <Grid item xs={12} md={6}>
        <Button variant="outlined" size="large" fullWidth>
          Reviewed Proposals
        </Button>
        </Grid>
        <Grid item xs={12} md={6}>
        <Button variant="outlined" size="large" fullWidth>
         Other Proposals
        </Button>
        </Grid>
        <Grid item xs={12} md={12}>
        <Button variant="outlined" size="large" fullWidth>
         Switch to Applicant
        </Button>
        </Grid>


      </Grid>
    </Box>
    </Container>
  );
}