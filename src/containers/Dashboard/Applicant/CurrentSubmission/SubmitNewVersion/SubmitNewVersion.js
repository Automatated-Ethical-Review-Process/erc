import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";


export function BasicButtons(props) {
  return (
    
      <Button variant="outlined">{props.label}</Button>
    
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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

export default function BasicGrid() {
  return (
    <Container>
    <Box alignItems='' justifyContent='' sx={{ flexGrow: 1 }}>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <UploadButton upload='Upload New Version'/>
        </Grid>
        <Grid item xs={12}>
          <Box alignItems='right' justifyContent='right' sx={{transform:('-50%','-505')}}>
          <Stack spacing={4} direction="row">
            <BasicButtons label='Submit'/>
            <BasicButtons label='Cancel'/>
          </Stack>
          </Box>
        </Grid>
    
      </Grid>
    </Box>
    </Container>
  );
}
