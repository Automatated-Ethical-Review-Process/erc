import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";

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
            fullWidth
            variant="contained"
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
      <Button
         fullWidth
         variant="contained"
         sx={{ minWidth: "15vw" }}
         onClick={props.onClick}
      >
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
            value={props.value}
            InputProps={{
               readOnly: true,
            }}
         />
      </Box>
   );
}

export default function BasicGrid() {
   const navigate = useNavigate();
   const location = useLocation();
   return (
      <Container maxWidth="md">
         <Box sx={{ flexGrow: 1, my: 7 }}>
            <Grid container spacing={4}>
               <Grid item xs={12}>
                  <BasicTextFields
                     value="ERC Proposal 1"
                     label="Proposal Title"
                  />
               </Grid>
               <Grid item xs={12}>
                  <BasicTextFields
                     value="Human resource"
                     label="Proposal Type"
                  />
               </Grid>
               <Grid item xs={12}>
                  <BasicTextFields value="12/06/2020" label="Submitted Date" />
               </Grid>
               <Grid item xs={12}>
                  <BasicTextFields value="One year" label="Duration" />
               </Grid>
               <Grid item xs={12}>
                  <BasicTextFields value="Disapproved" label="Status" />
               </Grid>
            </Grid>
         </Box>

         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
               <Grid item xs={12} md={6} sx={{ minWidth: "md" }}>
                  <UploadButton btnName="Submit New Version" />
               </Grid>
               <Grid item xs={12} md={6} sx={{ minWidth: "md" }}>
                  <BasicButton
                     label1="View Document"
                     onClick={() => navigate(location.pathname + "/1/versions")}
                  />
               </Grid>
            </Grid>
         </Box>
      </Container>
   );
}
