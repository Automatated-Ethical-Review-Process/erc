import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const schema = Yup.object().shape({
   password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(40, "Password must not exceed 40 characters"),
   confirmPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password")], "Your passwords do not match"),
});

export default function Step3({ setHandleSubmit, data }) {
   const { control, handleSubmit } = useForm({
      resolver: yupResolver(schema),
      defaultValues: data,
   });

   setHandleSubmit(handleSubmit);

   return (
      <>
         <Typography variant="h6" gutterBottom>
            Sign Up
         </Typography>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
               <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                     <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        label="New password"
                        variant="standard"
                        error={!!error}
                        helperText={error && error.message}
                     />
                  )}
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                     <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        label="Confirm password"
                        variant="standard"
                        error={!!error}
                        helperText={error && error.message}
                     />
                  )}
               />
            </Grid>
         </Grid>
      </>
   );
}
