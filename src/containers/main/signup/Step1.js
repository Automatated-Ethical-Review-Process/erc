import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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
import {
   CheckboxController,
   TextFieldController,
} from "components/controllers";

const schema = yObject({
   name: yString().required("Full name is required"),
   mobileNumber: yMobileNumber,
   landNumber: yLandNumber,
   nicPassport: yNicPassport,
   address: yAddress,
   educationalQualifications: yEducationalQualifications,
   isUnderGraduate: yBoolean(),
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
               <TextFieldController
                  name="name"
                  label="Full name"
                  control={control}
                  required
                  autoComplete="given-name"
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextFieldController
                  name="mobileNumber"
                  label="Mobile number"
                  control={control}
                  required
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextFieldController
                  name="landNumber"
                  label="Land number"
                  control={control}
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextFieldController
                  name="nicPassport"
                  label="NIC / Passport"
                  control={control}
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12}>
               <TextFieldController
                  name="address"
                  label="Address"
                  control={control}
                  required
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12}>
               <TextFieldController
                  name="educationalQualifications"
                  label="Educational qualifications"
                  control={control}
                  required
                  multiline
                  rows={4}
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12}>
               <CheckboxController
                  name="isUnderGraduate"
                  control={control}
                  label="Undergraduate"
               />
            </Grid>
         </Grid>
      </>
   );
}
