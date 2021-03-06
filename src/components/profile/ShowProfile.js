import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import { useNavigate } from "react-router-dom";

import NavigationBar from "components/NavigationBar";

import Image from "assests/baby.webp";

export function ImageAvatar() {
   return (
      <Avatar alt="Remy Sharp" src={Image} sx={{ width: 200, height: 200 }} />
   );
}

export function EditButton() {
   const navigate = useNavigate();
   return (
      <Button onClick={() => navigate("/profile/edit")} variant="contained">
         Edit
      </Button>
   );
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export function IsUndergraduateCheckbox() {
   return (
      <div>
         <Checkbox {...label} />
      </div>
   );
}

const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: "center",
   color: theme.palette.text.secondary,
}));

export function RowAndColumnSpacing() {
   return (
      <Container maxWidth={"md"}>
         <Grid
            container
            direction="column"
            alignItems="center"
            marginTop={2}
            marginBottom={2}
         >
            <ImageAvatar />
         </Grid>
         <Box sx={{ width: "100%" }}>
            <Grid container rowSpacing={2}>
               <Grid item xs={6}>
                  <Typography variant="h6">Name</Typography>
               </Grid>
               <Grid item xs={6}>
                  <Item>
                     <Typography>Malindu Madhusankha</Typography>
                  </Item>
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h6">Email</Typography>
               </Grid>
               <Grid item xs={6}>
                  <Item>
                     <Typography>dpmmadhusankha@gmail.com</Typography>
                  </Item>
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h6">Phone Number</Typography>
               </Grid>
               <Grid item xs={6}>
                  <Item>
                     <Typography>0789101112</Typography>
                  </Item>
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h6">Address</Typography>
               </Grid>
               <Grid item xs={6}>
                  <Item>
                     <Typography>No.10,ABC road,Matara</Typography>
                  </Item>
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h6">NIC/Passport</Typography>
               </Grid>
               <Grid item xs={6}>
                  <Item>
                     <Typography>123456789V</Typography>
                  </Item>
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h6">Is Undergraduate</Typography>
               </Grid>
               <Grid item xs={6}>
                  <Typography>
                     <IsUndergraduateCheckbox />
                  </Typography>
               </Grid>
               <Grid item xs={6}></Grid>
               <Grid item xs={6}>
                  <Typography>
                     <EditButton />
                  </Typography>
               </Grid>
            </Grid>
         </Box>
      </Container>
   );
}

export default function Checkout() {
   return (
      <NavigationBar title="Profile">
         <RowAndColumnSpacing />
      </NavigationBar>
   );
}
