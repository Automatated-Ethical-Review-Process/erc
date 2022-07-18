import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { yObject, yPassword, yRef } from "utils/yup";
import useForm from "hooks/useForm";
import { PasswordFieldController } from "components/controllers";

const schema = yObject({
   password: yPassword,
   confirmPassword: yPassword.oneOf(
      [yRef("password")],
      "Your passwords do not match"
   ),
});

export default function Step3({ setHandleSubmit, data }) {
   const { control, handleSubmit } = useForm(schema, data);

   setHandleSubmit(handleSubmit);

   return (
      <>
         <Typography variant="h6" gutterBottom>
            Sign Up
         </Typography>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
               <PasswordFieldController
                  name="password"
                  label="New password"
                  control={control}
                  required
                  variant="standard"
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <PasswordFieldController
                  name="confirmPassword"
                  label="Confirm password"
                  control={control}
                  required
                  variant="standard"
               />
            </Grid>
         </Grid>
      </>
   );
}
