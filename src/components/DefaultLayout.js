import React from "react";

import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
//import Grid from "@mui/material/Grid";
//import Divider from "@mui/material/Divider";
//import Box from "@mui/material/Box";
import SignIn from "./SignIn";

export default function Layout(props) {
   return (
      <div>
         <NavigationBar />
         {/*<SignIn/>}
         {<Grid container spacing={2}>
            <Grid item sm={6} md={7}>
            {props.componets[1]}
            </Grid>
            <Grid item sm={6} md={5}>
               {props.componets[0]}
            </Grid>
   </Grid>*/}
         <SignIn/>
         <Footer />
      </div>
   );
}
