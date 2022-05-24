import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Container } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Image from "../assests/baby.webp";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";


export  function ImageAvatar() {
  return (
      <Avatar
        alt="Remy Sharp"
        src= {Image}
        sx={{ width: 200, height: 200 }}
      />
  );
}



export function EditButton() {
  const navigate = useNavigate();
  return (
      <Button onClick={()=>navigate('/edit-profile')} variant="contained">Edit</Button>
  );
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export function IsUndergraduateCheckbox() {
  return (
    <div>
      <Checkbox {...label} />
    </div>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function RowAndColumnSpacing() {

  

  return (
    <Container maxWidth={"md"}>
      <Grid container direction="column" alignItems="center" marginTop={2} marginBottom={2}>
          <ImageAvatar/>
      </Grid>
      <Box sx={{ width: '100%' }}>
      <Grid 
        container
        rowSpacing={2} 
      >  
        <Grid item xs={6}>
          <Typography variant="h6">Name</Typography>
        </Grid>
        <Grid item xs={6}>
          <Item><Typography>Malindu Madhusankha</Typography></Item>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Email</Typography>
        </Grid>
        <Grid item xs={6}>
          <Item><Typography>dpmmadhusankha@gmail.com</Typography></Item>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Phone Number</Typography>
        </Grid>
        <Grid item xs={6}>
          <Item><Typography>0789101112</Typography></Item>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Address</Typography>
        </Grid>
        <Grid item xs={6}>
          <Item><Typography>No.10,ABC road,Matara</Typography></Item>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">NIC/Passport</Typography>
        </Grid>
        <Grid item xs={6}>
          <Item><Typography>123456789V</Typography></Item>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Is Undergraduate</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography><IsUndergraduateCheckbox/></Typography>
        </Grid>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={6}>
          <Typography><EditButton /></Typography>
        </Grid>
      </Grid>
    </Box>
    </Container>
  );
}
 
const theme = createTheme();

export default function Checkout() {


   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  P R O F I L E
                </Typography>
                <Button color="inherit">Logout</Button>
              </Toolbar>
            </AppBar>
          </Box>
         <RowAndColumnSpacing/>
      </ThemeProvider>
   );
}
