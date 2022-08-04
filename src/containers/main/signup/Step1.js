import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { BasicForm } from "components/common/Form";
import {
  CheckboxController,
  TextFieldController,
} from "components/controllers";
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

const schema = yObject({
  name: yString().required("Full name is required"),
  mobileNumber: yMobileNumber,
  landNumber: yLandNumber,
  nicPassport: yNicPassport,
  address: yAddress,
  educationalQualifications: yEducationalQualifications,
  isUnderGraduate: yBoolean(),
});

export default function Step1({ onSubmit, data, children }) {
  return (
    <BasicForm schema={schema} defaultValues={data} onSubmit={onSubmit}>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextFieldController
            name="name"
            label="Full name"
            required
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldController
            name="mobileNumber"
            label="Mobile number"
            required
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldController
            name="landNumber"
            label="Land number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldController
            name="nicPassport"
            label="NIC / Passport"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldController
            name="address"
            label="Address"
            required
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldController
            name="educationalQualifications"
            label="Educational qualifications"
            required
            multiline
            rows={4}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <CheckboxController name="isUnderGraduate" label="Undergraduate" />
        </Grid>
      </Grid>
      {children}
    </BasicForm>
  );
}
