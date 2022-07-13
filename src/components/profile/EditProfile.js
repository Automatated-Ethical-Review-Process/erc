import { useEffect, useRef, useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
   Container,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import NavigationBar from "components/NavigationBar";
import LoadingCircle from "components/common/LoadingCircle";
import useNotify from "hooks/useNotify";

import Image from "assests/baby.webp";
import {
   useCheckPasswordMutation,
   useUpdateEmailVerifyMutation,
   useUpdatePasswordMutation,
} from "api/auth/api";
import useAuth from "hooks/useAuth";

function InputPassword({ params: { value, error }, onChange, label }) {
   const [showPassword, setShowPassword] = useState(false);
   return (
      <TextField
         fullWidth
         label={label}
         variant="outlined"
         size="small"
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

function TextFieldHiddenLabel({ params: { value, error }, onChange }) {
   return (
      <TextField
         fullWidth
         value={value}
         onChange={onChange && ((e) => onChange(e.target.value))}
         error={!!error}
         helperText={error}
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

function EditDetails() {
   return (
      <>
         <Grid item xs={6}>
            <Typography variant="h7">Name</Typography>
         </Grid>
         <Grid item xs={6}>
            <TextFieldHiddenLabel params={{ value: "Malindu Madhusankha" }} />
         </Grid>
         <Grid item xs={6}>
            <Typography variant="h7">Phone Number</Typography>
         </Grid>
         <Grid item xs={6}>
            <TextFieldHiddenLabel params={{ value: "0789101112" }} />
         </Grid>
         <Grid item xs={6}></Grid>
         <Grid item xs={6}>
            <Button variant="contained" disabled={true}>
               Update Details
            </Button>
         </Grid>
      </>
   );
}

const schema = yup.string().email().required();
const isEmail = (value) => schema.isValidSync(value);

function EditEmail({ setIsLoading }) {
   const { user } = useAuth();
   const { notify } = useNotify(true);

   const [checkPassword, { isLoading: checkIsLoading }] =
      useCheckPasswordMutation();
   const [updateEmailVerify, { isLoading: updateIsLoading }] =
      useUpdateEmailVerifyMutation();

   const [email, setEmail] = useState({ value: user.email, error: null });

   const isLoading = checkIsLoading || updateIsLoading;

   const ref = useRef(false);
   useEffect(() => {
      if (ref.current) {
         setIsLoading(isLoading);
      } else {
         ref.current = true;
      }
   }, [setIsLoading, isLoading]);

   const onEmailChange = (value) =>
      setEmail({
         value,
         error: isEmail(value) ? "" : "invalid email address",
      });

   const canUpdate =
      !isLoading && email.value !== user.email && email.error === "";

   const [open, setOpen] = useState(false);

   const initial = { value: "", error: null };
   const [password, setPassword] = useState(initial);

   const onUpdate = () => setOpen(true);
   const onCancel = () => setOpen(false);
   const onChange = (value) =>
      setPassword({
         value,
         error: value.length < 8 ? "min size 8 characters" : "",
      });

   const onConfirm = () => {
      checkPassword({ password: password.value })
         .unwrap()
         .then(() => {
            setPassword(initial);
            setOpen(false);
            updateEmailVerify({
               oldEmail: user.email,
               newEmail: email.value,
            })
               .unwrap()
               .then(() => {
                  setEmail({ value: user.email, error: null });
                  notify("Please verify your email", "info");
               })
               .catch((err) =>
                  notify(err.data?.message || "Bad request", "error", {
                     persist: false,
                  })
               );
         })
         .catch(() => setPassword({ ...password, error: "invalid password" }));
   };

   return (
      <>
         <Grid item xs={6}>
            <Typography variant="h7">Email</Typography>
         </Grid>
         <Grid item xs={6}>
            <TextFieldHiddenLabel params={email} onChange={onEmailChange} />
         </Grid>
         <Grid item xs={6}></Grid>
         <Grid item xs={6}>
            <Button
               variant="contained"
               disabled={!canUpdate}
               onClick={onUpdate}
            >
               Update Email
            </Button>
         </Grid>
         <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Update Email</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Please enter your password.
               </DialogContentText>
               <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="password"
                  type="password"
                  fullWidth
                  variant="standard"
                  onChange={(e) => onChange(e.target.value)}
                  value={password.value}
                  error={!!password.error}
                  helperText={password.error}
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={onCancel}>Cancel</Button>
               <Button onClick={onConfirm} disabled={!!password.error}>
                  Confirm
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
}

function EditPassword({ setIsLoading }) {
   const navigate = useNavigate();
   const { notify } = useNotify(true);

   const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

   const ref = useRef(false);
   useEffect(() => {
      if (ref.current) {
         setIsLoading(isLoading);
      } else {
         ref.current = true;
      }
   }, [setIsLoading, isLoading]);

   const initialValue = { value: "", error: null };

   const [oldPassword, setOldPassword] = useState(initialValue);
   const [newPassword, setNewPassword] = useState(initialValue);
   const [confirmPassword, setConfirmPassword] = useState(initialValue);

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

   const canUpdate =
      !isLoading &&
      oldPassword.error === "" &&
      newPassword.error === "" &&
      confirmPassword.error === "";

   const onUpdate = () =>
      updatePassword({
         oldPassword: oldPassword.value,
         newPassword: newPassword.value,
      })
         .unwrap()
         .then(() => {
            setOldPassword(initialValue);
            setNewPassword(initialValue);
            setConfirmPassword(initialValue);
            notify("Password updated", "success");
         })
         .catch(() =>
            setOldPassword((params) => ({
               ...params,
               error: "did not match",
            }))
         );

   return (
      <>
         <Grid item xs={6}>
            <Typography variant="h7">Old Password</Typography>
         </Grid>
         <Grid item xs={6}>
            <InputPassword
               params={oldPassword}
               onChange={onOldChange}
               label="Old"
            />
         </Grid>
         <Grid item xs={6}>
            <Typography variant="h7">New Password</Typography>
         </Grid>
         <Grid item xs={6}>
            <InputPassword
               params={newPassword}
               onChange={onNewChange}
               label="New"
            />
         </Grid>
         <Grid item xs={6}>
            <Typography variant="h7">Re-entry new password</Typography>
         </Grid>
         <Grid item xs={6}>
            <InputPassword
               params={confirmPassword}
               onChange={onConfirmChange}
               label="Confirm"
            />
         </Grid>
         <Grid item xs={6}></Grid>
         <Grid item xs={6}>
            <Stack direction="row" spacing={2}>
               <Button
                  variant="contained"
                  disabled={!canUpdate}
                  onClick={onUpdate}
               >
                  Update Password
               </Button>
               <Button variant="contained" onClick={() => navigate(-1)}>
                  Cancel
               </Button>
            </Stack>
         </Grid>
      </>
   );
}

function Content() {
   const [isLoading, setIsLoading] = useState(false);
   return (
      <Container maxWidth={"md"}>
         <LoadingCircle isLoading={isLoading} />
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
               <EditDetails setIsLoading={setIsLoading} />
               <EditEmail setIsLoading={setIsLoading} />
               <EditPassword setIsLoading={setIsLoading} />
            </Grid>
         </Box>
      </Container>
   );
}

export default function EditProfile() {
   return (
      <NavigationBar title="Profile">
         <Content />
      </NavigationBar>
   );
}
