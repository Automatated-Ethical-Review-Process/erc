import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { yFile, yObject, yString } from "utils/yup";
import useForm from "hooks/useForm";
import {
   FileInputController,
   TextFieldController,
} from "components/controllers";

const schemaU = yObject({
   university: yString().required("University is required"),
   faculty: yString().required("Faculty is required"),
   year: yString(),
   registrationNumber: yString().required("Registration number is required"),
   idImg: yFile.required("Id photo is required"),
});

function Undergraduate({ setHandleSubmit, data }) {
   const { control, handleSubmit } = useForm(schemaU, data);

   setHandleSubmit(handleSubmit);

   return (
      <>
         <Grid item xs={12} sm={6}>
            <TextFieldController
               name="university"
               label="University"
               control={control}
               required
               variant="standard"
            />
         </Grid>
         <Grid item xs={12} sm={6}>
            <TextFieldController
               name="faculty"
               label="Faculty"
               control={control}
               required
               variant="standard"
            />
         </Grid>
         <Grid item xs={12} sm={6}>
            <TextFieldController
               name="registrationNumber"
               label="Registration number"
               control={control}
               required
               variant="standard"
            />
         </Grid>
         <Grid item xs={12} sm={6}>
            <TextFieldController
               name="year"
               label="Academic Year"
               control={control}
               variant="standard"
            />
         </Grid>
         <Grid item xs={12} sm={6}>
            <Typography>
               University Id{" "}
               <FileInputController name="idImg" control={control} />
            </Typography>
         </Grid>
      </>
   );
}

const schemaNU = yObject({
   occupation: yString().required("Occupation is required"),
   position: yString().required("Position is required"),
   idImg: yFile.required("Id photo is required"),
});

function NonUndergraduate({ setHandleSubmit, data }) {
   const { control, handleSubmit } = useForm(schemaNU, data);

   setHandleSubmit(handleSubmit);

   return (
      <>
         <Grid item xs={12} sm={6}>
            <TextFieldController
               name="occupation"
               label="Occupation"
               control={control}
               required
               variant="standard"
            />
         </Grid>
         <Grid item xs={12} sm={6}>
            <TextFieldController
               name="position"
               label="Position"
               control={control}
               required
               variant="standard"
            />
         </Grid>
         <Grid item xs={12} sm={6}>
            <Typography>
               National Id{" "}
               <FileInputController name="idImg" control={control} />
            </Typography>
         </Grid>
      </>
   );
}

export default function Step2({ setHandleSubmit, data }) {
   return (
      <>
         <Typography variant="h6" gutterBottom>
            {data.isUnderGraduate ? "Undergraduate" : "Academic Stuff"}
         </Typography>
         <Grid container spacing={3}>
            {data.isUnderGraduate ? (
               <Undergraduate setHandleSubmit={setHandleSubmit} data={data} />
            ) : (
               <NonUndergraduate
                  setHandleSubmit={setHandleSubmit}
                  data={data}
               />
            )}
         </Grid>
      </>
   );
}
