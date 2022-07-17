import { useState } from "react";

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
   Fab,
   Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";

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
import { useGetMeQuery, useUpdateMeMutation } from "api/data/user";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function ImageAvatar() {
   return (
      <Avatar
         alt="Profile Image"
         src={Image}
         sx={{ width: 200, height: 200 }}
      />
   );
}

function TextFieldController({ name, control, ...rest }) {
   return (
      <Controller
         name={name}
         control={control}
         render={({ field, fieldState: { error } }) => (
            <TextField
               {...field}
               fullWidth
               variant="outlined"
               size="small"
               error={!!error}
               helperText={error && error.message}
               {...rest}
            />
         )}
      />
   );
}

function PasswordFieldController({ label, ...rest }) {
   const [showPassword, setShowPassword] = useState(false);
   return (
      <TextFieldController
         label={label}
         type={showPassword ? "text" : "password"}
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
         {...rest}
      />
   );
}

function GridItem({ title, isPassword, ...rest }) {
   return (
      <>
         <Grid item xs={6}>
            <Typography variant="h7">{title}</Typography>
         </Grid>
         <Grid item xs={6}>
            {isPassword ? (
               <PasswordFieldController {...rest} />
            ) : (
               <TextFieldController {...rest} />
            )}
         </Grid>
      </>
   );
}

const schemaDetails = Yup.object().shape({
   mobileNumber: Yup.string()
      .required("Mobile number is required")
      .matches(/^\d{10}$/, "Invalid number"),
   landNumber: Yup.string().matches(/^(\d{10})?$/, "Invalid number"),
   address: Yup.string().required("Address is required"),
   educationalQualifications: Yup.string().required(
      "Education qualifications are required"
   ),
});

function EditDetails() {
   const { data = {}, isLoading: isLoadingGet } = useGetMeQuery();
   const [updateMe, { isLoading: isLoadingUpdate }] = useUpdateMeMutation();

   const isLoading = isLoadingGet || isLoadingUpdate;

   const { notify } = useNotify();

   const {
      control,
      handleSubmit,
      formState: { isDirty },
   } = useForm({
      resolver: yupResolver(schemaDetails),
      defaultValues: {
         ...data,
         educationalQualifications: (data.educationalQualifications || []).join(
            "\n"
         ),
      },
      shouldUnregister: true,
   });

   const onSubmit = ({ educationalQualifications, ...data }) => {
      const finalData = {
         ...data,
         educationalQualifications: educationalQualifications
            .split("\n")
            .filter((i) => i),
      };

      updateMe(finalData)
         .unwrap()
         .then(() => notify("Account details updated", "success"))
         .catch(() => notify("Something went wrong", "error"));
   };

   return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
         <LoadingCircle isLoading={isLoading} />
         <Grid container rowSpacing={2}>
            <GridItem
               title="Phone Number"
               name="mobileNumber"
               control={control}
            />
            <GridItem title="Land Number" name="landNumber" control={control} />
            <GridItem title="Address" name="address" control={control} />
            <GridItem
               title="Educational Qualifications"
               name="educationalQualifications"
               control={control}
               multiline
               rows={4}
            />
            <Grid item xs={6} />
            <Grid item xs={6}>
               <Button variant="contained" type="submit" disabled={!isDirty}>
                  Update Details
               </Button>
            </Grid>
         </Grid>
      </Box>
   );
}

const schemaEmail = Yup.object().shape({
   email: Yup.string().required("Email is required").email("Invalid email"),
});

const schemaPassword = Yup.object().shape({
   password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(40, "Password must not exceed 40 characters"),
});

function EditEmail() {
   const { user } = useAuth();
   const { notify } = useNotify(true);

   const [checkPassword, { isLoading: checkIsLoading }] =
      useCheckPasswordMutation();
   const [updateEmailVerify, { isLoading: updateIsLoading }] =
      useUpdateEmailVerifyMutation();

   const isLoading = checkIsLoading || updateIsLoading;

   const {
      control: controlEmail,
      handleSubmit: handleSubmitEmail,
      formState: { isDirty },
      getValues,
      reset: resetEmail,
   } = useForm({
      resolver: yupResolver(schemaEmail),
      defaultValues: { email: user.email ?? "" },
   });

   const onSubmitEmail = () => setOpen(true);

   const {
      control: controlPassword,
      handleSubmit: handleSubmitPassword,
      setError,
      reset: resetPassword,
   } = useForm({
      resolver: yupResolver(schemaPassword),
      defaultValues: { password: "" },
   });

   const [open, setOpen] = useState(false);

   const onCancel = () => setOpen(false);

   const onSubmitPassword = ({ password }) => {
      checkPassword({ password })
         .unwrap()
         .then(() => {
            setOpen(false);
            updateEmailVerify({
               oldEmail: user.email,
               newEmail: getValues("email"),
            })
               .unwrap()
               .then(({ token }) => {
                  resetEmail();
                  resetPassword();
                  notify("Please verify your email", "info");
                  console.log(
                     `${window.location.href
                        .split("/")
                        .slice(0, 3)
                        .join("/")}/update/email?token=${token}`
                  );
               })
               .catch((err) =>
                  notify(err.data?.message || "Bad request", "error", {
                     persist: false,
                  })
               );
         })
         .catch(() => setError("password", { message: "invalid password" }));
   };

   return (
      <>
         <LoadingCircle isLoading={isLoading} />
         <Box
            component="form"
            onSubmit={handleSubmitEmail(onSubmitEmail)}
            noValidate
         >
            <Grid container rowSpacing={2}>
               <GridItem title="Email" name="email" control={controlEmail} />
               <Grid item xs={6} />
               <Grid item xs={6}>
                  <Button variant="contained" disabled={!isDirty} type="submit">
                     Update Email
                  </Button>
               </Grid>
            </Grid>
         </Box>
         <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Update Email</DialogTitle>
            <Box
               component="form"
               onSubmit={handleSubmitPassword(onSubmitPassword)}
               noValidate
            >
               <DialogContent>
                  <DialogContentText>
                     Please enter your password.
                  </DialogContentText>
                  <PasswordFieldController
                     autoFocus
                     margin="dense"
                     variant="standard"
                     label="Password"
                     name="password"
                     control={controlPassword}
                  />
               </DialogContent>
               <DialogActions>
                  <Button onClick={onCancel}>Cancel</Button>
                  <Button type="submit">Confirm</Button>
               </DialogActions>
            </Box>
         </Dialog>
      </>
   );
}

const schemaConfirmPassword = Yup.object().shape({
   oldPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(40, "Password must not exceed 40 characters")
      .default(""),
   newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(40, "Password must not exceed 40 characters")
      .notOneOf([Yup.ref("oldPassword")], "New password same as old")
      .default(""),
   confirmPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("newPassword")], "Your passwords do not match")
      .default(""),
});

function EditPassword() {
   const { notify } = useNotify(true);
   const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

   const {
      control,
      handleSubmit,
      formState: { isDirty },
      reset,
      setError,
   } = useForm({
      resolver: yupResolver(schemaConfirmPassword),
      defaultValues: schemaConfirmPassword.getDefault(),
   });

   const onSubmit = ({ oldPassword, newPassword }) =>
      updatePassword({
         oldPassword,
         newPassword,
      })
         .unwrap()
         .then(() => {
            reset();
            notify("Password updated", "success");
         })
         .catch(() => setError("oldPassword", { message: "did not match" }));

   return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
         <LoadingCircle isLoading={isLoading} />
         <Grid container rowSpacing={2}>
            <GridItem
               title="Old Password"
               name="oldPassword"
               label="Old"
               isPassword={true}
               control={control}
            />
            <GridItem
               title="New Password"
               name="newPassword"
               label="New"
               isPassword={true}
               control={control}
            />
            <GridItem
               title="Confirm Password"
               name="confirmPassword"
               label="Confirm"
               isPassword={true}
               control={control}
            />
            <Grid item xs={6} />
            <Grid item xs={6}>
               <Button variant="contained" disabled={!isDirty} type="submit">
                  Update Password
               </Button>
            </Grid>
         </Grid>
      </Box>
   );
}

function Content() {
   const navigate = useNavigate();
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
            <Stack spacing={2}>
               <EditDetails />
               <EditEmail />
               <EditPassword />
            </Stack>
         </Box>
         <Fab
            variant="extended"
            color="secondary"
            sx={(t) => ({
               position: "fixed",
               right: t.spacing(4),
               bottom: t.spacing(4),
            })}
            onClick={() => navigate(-1)}
         >
            <CloseIcon sx={{ mr: 1 }} />
            Cancel
         </Fab>
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
