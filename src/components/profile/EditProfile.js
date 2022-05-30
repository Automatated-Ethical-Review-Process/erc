import { useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate } from "react-router-dom";

import NavigationBar from "components/NavigationBar";

import Image from "assests/baby.webp";

export function InputPassword() {
   const [values, setValues] = useState({
      amount: "",
      password: "",
      weight: "",
      weightRange: "",
      showPassword: false,
   });

   const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
   };

   const handleClickShowPassword = () => {
      setValues({
         ...values,
         showPassword: !values.showPassword,
      });
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   return (
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
         <div>
            <FormControl sx={{ width: "40ch" }} variant="outlined" size="small">
               <InputLabel htmlFor="outlined-adornment-password">
                  Password
               </InputLabel>
               <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                     <InputAdornment position="end">
                        <IconButton
                           aria-label="toggle password visibility"
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}
                           edge="end"
                        >
                           {values.showPassword ? (
                              <VisibilityOff />
                           ) : (
                              <Visibility />
                           )}
                        </IconButton>
                     </InputAdornment>
                  }
                  label="Password"
               />
            </FormControl>
         </div>
      </Box>
   );
}

export function TextFieldHiddenLabel({ defaultValue }) {
   return (
      <TextField
         sx={{ width: "40ch" }}
         hiddenLabel
         id="filled-hidden-label-small"
         defaultValue={defaultValue}
         variant="outlined"
         size="small"
      />
   );
}

export function ImageAvatar() {
   return (
      <Avatar alt="Remy Sharp" src={Image} sx={{ width: 200, height: 200 }} />
   );
}

export function EditButton() {
   const navigate = useNavigate();
   return (
      <Stack direction="row" spacing={5}>
         <Button variant="contained" onClick={() => navigate("/profile")}>
            Update
         </Button>
         <Button variant="contained" onClick={() => navigate("/profile")}>
            Cancel
         </Button>
      </Stack>
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
                  <TextFieldHiddenLabel defaultValue="Malindu Madhusankha" />
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h6">Email</Typography>
               </Grid>
               <Grid item xs={6}>
                  <TextFieldHiddenLabel defaultValue="dpmmadhusankha@gmail.com" />
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h6">Phone Number</Typography>
               </Grid>
               <Grid item xs={6}>
                  <TextFieldHiddenLabel defaultValue="0789101112" />
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h6">Old Password</Typography>
               </Grid>
               <Grid item xs={6}>
                  <InputPassword />
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h6">New Password</Typography>
               </Grid>
               <Grid item xs={6}>
                  <InputPassword />
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h6">Re-entry new password</Typography>
               </Grid>
               <Grid item xs={6}>
                  <InputPassword />
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

export default function EditProfile() {
   return (
      <NavigationBar title="Profile">
         <RowAndColumnSpacing />
      </NavigationBar>
   );
}
