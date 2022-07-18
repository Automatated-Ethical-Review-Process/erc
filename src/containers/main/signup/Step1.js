import { Controller } from "react-hook-form";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
   yAddress,
   yBoolean,
   yEducationalQualifications,
   yLandNumber,
   yMobileNumber,
   yNicPassport,
   yObject,
   yString,
} from "utils/yup";
import useForm from "hooks/useForm";

const schema = yObject({
   name: yString().required("Full name is required"),
   mobileNumber: yMobileNumber,
   landNumber: yLandNumber,
   nicPassport: yNicPassport,
   address: yAddress,
   educationalQualifications: yEducationalQualifications,
   isUnderGraduate: yBoolean,
});

export default function Step1({ setHandleSubmit, data }) {
   const { control, handleSubmit } = useForm(schema, data);

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
               <Controller
                  name="isUnderGraduate"
                  control={control}
                  render={({ field: { value, ...rest } }) => (
                     <FormControlLabel
                        control={
                           <Checkbox
                              {...rest}
                              checked={value}
                              color="secondary"
                           />
                        }
                        label="Undergraduate"
                     />
                  )}
               />
            </Grid>
         </Grid>
      </>
   );
}
