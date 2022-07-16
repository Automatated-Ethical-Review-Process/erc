import { Controller } from "react-hook-form";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Input = styled("input")({
   display: "none",
});

const schemaFile = Yup.mixed((o) => o instanceof File)
   .nullable()
   .required("Id photo is required");

const schemaU = Yup.object().shape({
   university: Yup.string().required("University is required"),
   faculty: Yup.string().required("Faculty is required"),
   year: Yup.string(),
   registrationNumber: Yup.string().required("Registration Number is required"),
   idImg: schemaFile,
});

function FileController({ control }) {
   return (
      <Controller
         name="idImg"
         control={control}
         render={({
            field: { value, onChange, ...rest },
            fieldState: { error },
         }) => (
            <label htmlFor="idImg">
               <Input
                  {...rest}
                  id="idImg"
                  accept="image/*"
                  type="file"
                  files={[value]}
                  onChange={({ target: t }) =>
                     onChange({
                        target: { ...t, value: t.files[0] },
                     })
                  }
               />
               <Button component="span" startIcon={<PhotoCamera />}>
                  Upload
               </Button>
               {value && (
                  <Typography
                     component="span"
                     variant="body2"
                     color="secondary"
                  >
                     {value.name}
                  </Typography>
               )}
               {error && (
                  <Typography component="span" variant="body2" color="error">
                     {error.message}
                  </Typography>
               )}
            </label>
         )}
      />
   );
}

function Undergraduate({ setHandleSubmit, data }) {
   const { control, handleSubmit } = useForm({
      resolver: yupResolver(schemaU),
      defaultValues: data,
   });

   setHandleSubmit(handleSubmit);

   return (
      <>
         <Grid item xs={12} sm={6}>
            <Controller
               name="university"
               control={control}
               render={({ field, fieldState: { error } }) => (
                  <TextField
                     {...field}
                     margin="normal"
                     required
                     fullWidth
                     label="University"
                     variant="standard"
                     error={!!error}
                     helperText={error && error.message}
                  />
               )}
            />
         </Grid>
         <Grid item xs={12} sm={6}>
            <Controller
               name="faculty"
               control={control}
               render={({ field, fieldState: { error } }) => (
                  <TextField
                     {...field}
                     margin="normal"
                     required
                     fullWidth
                     label="Faculty"
                     variant="standard"
                     error={!!error}
                     helperText={error && error.message}
                  />
               )}
            />
         </Grid>
         <Grid item xs={12} sm={6}>
            <Controller
               name="registrationNumber"
               control={control}
               render={({ field, fieldState: { error } }) => (
                  <TextField
                     {...field}
                     margin="normal"
                     required
                     fullWidth
                     label="Registration number"
                     variant="standard"
                     error={!!error}
                     helperText={error && error.message}
                  />
               )}
            />
         </Grid>
         <Grid item xs={12} sm={6}>
            <Controller
               name="year"
               control={control}
               render={({ field, fieldState: { error } }) => (
                  <TextField
                     {...field}
                     margin="normal"
                     fullWidth
                     label="Academic Year"
                     variant="standard"
                     error={!!error}
                     helperText={error && error.message}
                  />
               )}
            />
         </Grid>
         <Grid item xs={12} sm={6}>
            <Typography>
               University Id <FileController control={control} />
            </Typography>
         </Grid>
      </>
   );
}

const schemaNU = Yup.object().shape({
   occupation: Yup.string().required("Occupation is required"),
   position: Yup.string().required("Position is required"),
   idImg: schemaFile,
});

function NonUndergraduate({ setHandleSubmit, data }) {
   const { control, handleSubmit } = useForm({
      resolver: yupResolver(schemaNU),
      defaultValues: data,
   });

   setHandleSubmit(handleSubmit);

   return (
      <>
         <Grid item xs={12} sm={6}>
            <Controller
               name="occupation"
               control={control}
               render={({ field, fieldState: { error } }) => (
                  <TextField
                     {...field}
                     margin="normal"
                     required
                     fullWidth
                     label="Occupation"
                     variant="standard"
                     error={!!error}
                     helperText={error && error.message}
                  />
               )}
            />
         </Grid>
         <Grid item xs={12} sm={6}>
            <Controller
               name="position"
               control={control}
               render={({ field, fieldState: { error } }) => (
                  <TextField
                     {...field}
                     margin="normal"
                     required
                     fullWidth
                     label="Position"
                     variant="standard"
                     error={!!error}
                     helperText={error && error.message}
                  />
               )}
            />
         </Grid>
         <Grid item xs={12} sm={6}>
            <Typography>
               National Id <FileController control={control} />
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
