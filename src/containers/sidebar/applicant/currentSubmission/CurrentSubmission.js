import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Input = styled("input")({
   display: "none",
});

export function UploadButton(props) {
   return (
      <label htmlFor="contained-button-file">
         <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
         />
         <Button
            fullWidth="true"
            variant="outlined"
            component="span"
            sx={{ minWidth: "15vw" }}
         >
            {props.btnName}
         </Button>
      </label>
   );
}

export function BasicButton(props) {
   return (
      <Button fullWidth="true" variant="outlined" sx={{ minWidth: "15vw" }}>
         {props.label1}
      </Button>
   );
}

export function BasicTextFields(props) {
   return (
      <Box
         component="form"
         sx={{
            "& > :not(style)": { width: "100%" },
         }}
         noValidate
         autoComplete="off"
      >
         <TextField
            size="small"
            id="outlined-read-only-input"
            label={props.label}
            defaultValue="Hello World"
            InputProps={{
               readOnly: true,
            }}
         />
      </Box>
   );
}

export default function BasicGrid() {
   //const navigate = useNavigate();
   return (
      <Container maxWidth="md">
         <Box sx={{ flexGrow: 1, my: 7 }}>
            <Grid container spacing={4}>
               <Grid item xs={12}>
                  <BasicTextFields label="Proposal Title" />
               </Grid>
               <Grid item xs={12}>
                  <BasicTextFields label="Proposal Type" />
               </Grid>
               <Grid item xs={12}>
                  <BasicTextFields label="Submitted Date" />
               </Grid>
               <Grid item xs={12}>
                  <BasicTextFields label="Duration" />
               </Grid>
               <Grid item xs={12}>
                  <BasicTextFields label="Status" />
               </Grid>
            </Grid>
         </Box>

         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
               <Grid item xs={12} md={6} sx={{ minWidth: "md" }}>
                  <UploadButton btnName="Submit New Version" />
               </Grid>
               <Grid item xs={12} md={6} sx={{ minWidth: "md" }}>
                  <BasicButton label1="View Document" />
               </Grid>
            </Grid>
         </Box>
      </Container>
   );
}