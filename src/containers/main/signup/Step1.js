import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Controller } from "react-hook-form";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
   name: Yup.string().required("Full name is required"),
   mobileNumber: Yup.string()
      .required("Mobile number is required")
      .min(10, "Mobile number must be at least 10 characters"),
   landNumber: Yup.string()
      .required("Land number is required")
      .min(10, "Land number must be at least 10 characters"),
   nicPassport: Yup.string(),
   address: Yup.string().required("Address is required"),
   educationalQualifications: Yup.string().required(
      "Education qualifications are required"
   ),
   isUnderGraduate: Yup.boolean(),
});

export default function Step1({ setHandleSubmit, data }) {
   const { control, handleSubmit } = useForm({
      resolver: yupResolver(schema),
      defaultValues: data,
   });

   setHandleSubmit(handleSubmit);

   return (
      <>
         <Typography variant="h6" gutterBottom>
            Personal Details
         </Typography>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
               <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                     <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label="Full name"
                        autoComplete="given-name"
                        variant="standard"
                        error={!!error}
                        helperText={error && error.message}
                     />
                  )}
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <Controller
                  name="mobileNumber"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                     <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label="Mobile number"
                        variant="standard"
                        error={!!error}
                        helperText={error && error.message}
                     />
                  )}
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <Controller
                  name="landNumber"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                     <TextField
                        {...field}
                        margin="normal"
                        fullWidth
                        label="Land number"
                        variant="standard"
                        error={!!error}
                        helperText={error && error.message}
                     />
                  )}
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <Controller
                  name="nicPassport"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                     <TextField
                        {...field}
                        margin="normal"
                        fullWidth
                        label="NIC / Passport"
                        variant="standard"
                        error={!!error}
                        helperText={error && error.message}
                     />
                  )}
               />
            </Grid>
            <Grid item xs={12}>
               <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                     <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label="Address"
                        variant="standard"
                        autoComplete="shipping address-line1"
                        error={!!error}
                        helperText={error && error.message}
                     />
                  )}
               />
            </Grid>
            <Grid item xs={12}>
               <Controller
                  name="educationalQualifications"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                     <TextField
                        {...field}
                        margin="normal"
                        required
                        multiline
                        fullWidth
                        rows={4}
                        label="Educational qualifications"
                        variant="standard"
                        error={!!error}
                        helperText={error && error.message}
                     />
                  )}
               />
            </Grid>
            <Grid item xs={12}>
               <FormControlLabel
                  control={
                     <Controller
                        name="isUnderGraduate"
                        control={control}
                        render={({ field }) => (
                           <Checkbox {...field} color="secondary" />
                        )}
                     />
                  }
                  label="Undergraduate"
               />
            </Grid>
         </Grid>
      </>
   );
}
