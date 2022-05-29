import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Header() {
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
