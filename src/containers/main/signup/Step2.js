import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { BasicForm } from "components/common/Form";
import { TextFieldController } from "components/controllers";
import { yObject, yString } from "utils/yup";

const schemaU = yObject({
  university: yString().required("University is required"),
  faculty: yString().required("Faculty is required"),
  year: yString(),
  registrationNumber: yString().required("Registration number is required"),
});

function Undergraduate({ onSubmit, data, children }) {
  return (
    <BasicForm schema={schemaU} defaultValues={data} onSubmit={onSubmit}>
      <Typography variant="h6" gutterBottom>
        Undergraduate
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextFieldController
            name="university"
            label="University"
            required
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldController
            name="faculty"
            label="Faculty"
            required
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldController
            name="registrationNumber"
            label="Registration number"
            required
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldController
            name="year"
            label="Academic Year"
            variant="standard"
          />
        </Grid>
      </Grid>
      {children}
    </BasicForm>
  );
}

const schemaNU = yObject({
  occupation: yString().required("Occupation is required"),
  position: yString().required("Position is required"),
});

function NonUndergraduate({ onSubmit, data, children }) {
  return (
    <BasicForm schema={schemaNU} defaultValues={data} onSubmit={onSubmit}>
      <Typography variant="h6" gutterBottom>
        Academic Stuff
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextFieldController
            name="occupation"
            label="Occupation"
            required
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldController
            name="position"
            label="Position"
            required
            variant="standard"
          />
        </Grid>
      </Grid>
      {children}
    </BasicForm>
  );
}

export default function Step2(props) {
  return props.data.isUnderGraduate ? (
    <Undergraduate {...props} />
  ) : (
    <NonUndergraduate {...props} />
  );
}
