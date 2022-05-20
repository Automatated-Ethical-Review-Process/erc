import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export default function Step3() {
   return (
      <React.Fragment>
         <Typography variant="h6" gutterBottom>
            Sign Up
         </Typography>
         <Grid container spacing={3}>
            <Grid item xs={12}>
               <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  fullWidth
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  fullWidth
                  variant="standard"
               />
            </Grid>
         </Grid>
      </React.Fragment>
   );
}
