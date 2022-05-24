import * as React from 'react';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



export function ReadOnlyTextFeild(props){
    return(
        <TextField sx={
            {
                width: '100%'
            }
        }
          id="outlined-read-only-input"
          label={props.label}
          defaultValue="Read Only Text"
          InputProps={{
            readOnly: true,
          }}
        />
    );
}


export default function Proposals() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
        <ReadOnlyTextFeild label="ID" />
        </Grid>
        { <Grid item xs={8}>
       
        </Grid> }
        <Grid item xs={4}>
        <ReadOnlyTextFeild label="Name" />
        </Grid>
        <Grid item xs={8}>
       
        </Grid>
        <Grid item xs={4}>
        <ReadOnlyTextFeild label="Date" />
        </Grid>
        <Grid item xs={8}>
       
        </Grid>
        <Grid item xs={4}>
        <ReadOnlyTextFeild label="Time" />
        </Grid>
        <Grid item xs={8}>
       
        </Grid>
        <Grid item xs={4}>
        <ReadOnlyTextFeild label="Category" />
        </Grid>
        <Grid item xs={8}>
       
        </Grid>
        <Grid item xs={4}>
        <ReadOnlyTextFeild label="Deadline" />
        </Grid>
        <Grid item xs={8}>
       
        </Grid>
        <Grid item xs={4}>
        <Button variant="contained">View Documents</Button>
        </Grid>
        <Grid item xs={8}>
       
        </Grid>
        <Grid item xs={4}>
       
        </Grid>
        <Grid item xs={4}>
        <Button variant="contained" color="success">I do not have a conflic of interest, I accept </Button>
        </Grid>
        <Grid item xs={4} alignItems="end">
        <Button variant="contained" color="error">I have a conflic of interest, I decline</Button>
        </Grid>
        
      </Grid>
    </Box>
  );
}
