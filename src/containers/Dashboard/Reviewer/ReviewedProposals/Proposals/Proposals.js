import * as React from 'react';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';



export function ReadOnlyTextFeild(props){
    return(
        <TextField sx={
            {
                width: '100%'
            }
        }
          id="outlined-read-only-input"
          size="small"
          label={props.label}
          defaultValue="Read Only Text"
          InputProps={{
            readOnly: true,
          }}
        />
    );
}


export default function ReviewedProposals() {
  return (    
    <Container maxWidth='md' sx={{mt:4}}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>        
        <Grid item xs={12}>
        <ReadOnlyTextFeild label="Proposal Title" />
        </Grid>
        
        <Grid item xs={12}>
        <ReadOnlyTextFeild label="Date" />
        </Grid>
        
        <Grid item xs={12}>
        <ReadOnlyTextFeild label="Time" />
        </Grid>
        
        <Grid item xs={12}>
        <ReadOnlyTextFeild label="Category" />
        </Grid>
        
        <Grid item xs={12}>
        <ReadOnlyTextFeild label="Deadline" />
        </Grid>
        
        <Grid item xs={12}>
        <Button variant="contained">View Documents</Button>
        </Grid>
        
        </Grid>
    </Box>
    </Container>
    
  );
}
