import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { BasicForm } from "components/common/Form";
import { PasswordFieldController } from "components/controllers";
import { yObject, yPassword, yRef } from "utils/yup";

const schema = yObject({
  password: yPassword,
  confirmPassword: yPassword.oneOf(
    [yRef("password")],
    "Your passwords do not match"
  ),
});

export default function Step3({ onSubmit, data, children }) {
  return (
    <BasicForm schema={schema} defaultValues={data} onSubmit={onSubmit}>
      <Typography variant="h6" gutterBottom>
        Sign Up
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <PasswordFieldController
            name="password"
            label="New password"
            required
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PasswordFieldController
            name="confirmPassword"
            label="Confirm password"
            required
            variant="standard"
          />
        </Grid>
      </Grid>
      {children}
    </BasicForm>
  );
}
