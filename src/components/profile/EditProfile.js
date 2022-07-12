import { useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate } from "react-router-dom";

import NavigationBar from "components/NavigationBar";

import Image from "assests/baby.webp";
import { useUpdatePasswordMutation } from "api/auth/api";

function InputPassword({ params: { value, error }, onChange }) {
   const [showPassword, setShowPassword] = useState(true);

   return (
      <TextField
         label="Password"
         variant="outlined"
         type={showPassword ? "text" : "password"}
         value={value}
         onChange={(e) => onChange(e.target.value)}
         error={!!error}
         helperText={error}
         InputProps={{
            endAdornment: (
               <InputAdornment position="end">
                  <IconButton
                     onClick={() => setShowPassword((v) => !v)}
                     onMouseDown={(e) => e.preventDefault()}
                     edge="end"
                  >
                     {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
               </InputAdornment>
            ),
         }}
      />
   );
}

function TextFieldHiddenLabel({ defaultValue }) {
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

function ImageAvatar() {
   return (
      <Avatar alt="Remy Sharp" src={Image} sx={{ width: 200, height: 200 }} />
   );
}

function RowAndColumnSpacing() {
   const navigate = useNavigate();
   const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

   const [oldPassword, setOldPassword] = useState({ value: "", error: null });
   const [newPassword, setNewPassword] = useState({ value: "", error: null });
   const [confirmPassword, setConfirmPassword] = useState({
      value: "",
      error: null,
   });

   const onOldChange = (value) => {
      setOldPassword({
         value,
         error: value.length < 8 ? "min size 8 characters" : "",
      });
      if (newPassword.value.length >= 8 && value.length >= 8) {
         setNewPassword((params) => ({
            ...params,
            error: value === params.value ? "same as old password" : "",
         }));
      }
   };

   const onNewChange = (value) => {
      setNewPassword({
         value,
         error:
            value.length < 8
               ? "min size 8 characters"
               : value === oldPassword.value
               ? "same as old password"
               : "",
      });
      if (confirmPassword.value.length >= 8 && value.length >= 8) {
         setConfirmPassword((params) => ({
            ...params,
            error:
               value !== params.value ? "did not match with new password" : "",
         }));
      }
   };

   const onConfirmChange = (value) =>
      setConfirmPassword({
         value,
         error:
            value.length < 8
               ? "min size 8 characters"
               : value !== newPassword.value
               ? "did not match with new password"
               : "",
      });

   const errors =
      oldPassword.error || newPassword.error || confirmPassword.error;

   const onUpdate = () => {
      const oldPass = oldPassword.value;
      const newPass = newPassword.value;

      updatePassword({ oldPassword: oldPass, newPassword: newPass })
         .unwrap()
         .then(() => navigate("/profile", { replace: true }))
         .catch(() =>
            setOldPassword((params) => ({
               ...params,
               error: "did not match",
            }))
         );
   };

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
                  <InputPassword params={oldPassword} onChange={onOldChange} />
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h6">New Password</Typography>
               </Grid>
               <Grid item xs={6}>
                  <InputPassword params={newPassword} onChange={onNewChange} />
               </Grid>
               <Grid item xs={6}>
                  <Typography variant="h6">Re-entry new password</Typography>
               </Grid>
               <Grid item xs={6}>
                  <InputPassword
                     params={confirmPassword}
                     onChange={onConfirmChange}
                  />
               </Grid>
               <Grid item xs={6}></Grid>
               <Grid item xs={6}>
                  <Stack direction="row" spacing={5}>
                     <Button
                        variant="contained"
                        disabled={isLoading || errors !== ""}
                        onClick={onUpdate}
                     >
                        Update
                     </Button>
                     <Button variant="contained" onClick={() => navigate(-1)}>
                        Cancel
                     </Button>
                  </Stack>
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
