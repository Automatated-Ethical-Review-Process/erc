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
import useAuth from "hooks/useAuth";

function ImageAvatar() {
   return (
      <Avatar alt="Remy Sharp" src={Image} sx={{ width: 200, height: 200 }} />
   );
}

function EditButton() {
   const navigate = useNavigate();
   return (
      <Button onClick={() => navigate("/profile/edit")} variant="contained">
         Edit
      </Button>
   );
}

const Item = styled(Paper)(({ theme }) => ({
   padding: theme.spacing(1),
   textAlign: "center",
}));

export function Content() {
   const { user } = useAuth();
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
                  <Typography variant="h7">Name</Typography>
               </Grid>
               <Grid item xs={6}>
                  <Item>
                     <Typography>Malindu Madhusankha</Typography>
                  </Item>
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h7">Email</Typography>
               </Grid>
               <Grid item xs={6}>
                  <Item>
                     <Typography>{user.email}</Typography>
                  </Item>
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h7">Phone Number</Typography>
               </Grid>
               <Grid item xs={6}>
                  <Item>
                     <Typography>0789101112</Typography>
                  </Item>
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h7">Address</Typography>
               </Grid>
               <Grid item xs={6}>
                  <Item>
                     <Typography>No.10, ABC road, Matara</Typography>
                  </Item>
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h7">NIC/Passport</Typography>
               </Grid>
               <Grid item xs={6}>
                  <Item>
                     <Typography>123456789V</Typography>
                  </Item>
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h7">Is Undergraduate</Typography>
               </Grid>
               <Grid item xs={6}>
                  <Checkbox disabled={true} checked={true} />
               </Grid>
               <Grid item xs={6}></Grid>
               <Grid item xs={6}>
                  <EditButton />
               </Grid>
            </Grid>
         </Box>
      </Container>
   );
}

export default function ShowProfile() {
   return (
      <NavigationBar title="Profile">
         <Content />
      </NavigationBar>
   );
}
