import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Input = styled("input")({
   display: "none",
});

export default function Step2() {
   return (
      <React.Fragment>
         <Typography variant="h6" gutterBottom>
            Undergraduate
         </Typography>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="university"
                  name="university"
                  label="University"
                  fullWidth
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="faculty"
                  name="faculty"
                  label="Faculty"
                  fullWidth
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="regNumber"
                  name="regNumber"
                  label="Registration number"
                  fullWidth
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  id="academicYear"
                  name="academicYear"
                  label="Academic Year"
                  fullWidth
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <Typography>
                  University Id{" "}
                  <label htmlFor="contained-button-file">
                     <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                     />
                     <Button component="span" startIcon={<PhotoCamera />}>
                        Upload
                     </Button>
                  </label>
               </Typography>
            </Grid>
         </Grid>
      </React.Fragment>
   );
}
