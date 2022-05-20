import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container direction="column" alignItems="center">
            
        <Typography variant="h5" component="div">
          University of Ruhuna
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Faculty of Medicine
        </Typography>
        <Typography variant="h4" component="div">
          Ethical Reviewing System
        </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}
