import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Step1() {
   const [nationality, setNationality] = React.useState("");

   const handleChange = (event) => {
      setNationality(event.target.value);
   };

   return (
      <React.Fragment>
         <Typography variant="h6" gutterBottom>
            Personal Details
         </Typography>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone number"
                  fullWidth
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  id="landNumber"
                  name="landNumber"
                  label="Land number"
                  fullWidth
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  id="nicPassport"
                  name="nicPassport"
                  label="NIC / Passport"
                  fullWidth
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label">
                        Nationality
                     </InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={nationality}
                        label="Nationality"
                        onChange={handleChange}
                     >
                        <MenuItem value={"lanka"}>Sri Lanka</MenuItem>
                        <MenuItem value={"other"}>Other</MenuItem>
                     </Select>
                  </FormControl>
               </Box>
            </Grid>
            <Grid item xs={12}>
               <TextField
                  required
                  id="qualifications"
                  name="qualifications"
                  label="Educational qualifications"
                  multiline
                  fullWidth
                  rows={4}
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12}>
               <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12}>
               <TextField
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12}>
               <FormControlLabel
                  control={
                     <Checkbox
                        color="secondary"
                        name="undergraduate"
                        value="yes"
                     />
                  }
                  label="Undergraduate"
               />
            </Grid>
         </Grid>
      </React.Fragment>
   );
}
