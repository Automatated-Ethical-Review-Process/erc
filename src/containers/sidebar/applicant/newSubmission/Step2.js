import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Input = styled("input")({
   display: "none",
});

export function UploadButton() {
   return (
      <Box>
         <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="contained-button-file">
               <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
               />
               <Button
                  variant="outlined"
                  component="span"
                  sx={{ width: { xs: "100%" } }}
               >
                  Upload slip copy
               </Button>
            </label>
            <label htmlFor="icon-button-file">
               <Input accept="image/*" id="icon-button-file" type="file" />
               <IconButton color="primary" component="span">
                  <PhotoCamera />
               </IconButton>
            </label>
         </Stack>
      </Box>
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
            id="outlined-basic"
            label={props.label}
            variant="outlined"
            size="small"
         />
      </Box>
   );
}

export default function BasicGrid() {
   return (
      <Container maxWidth="md">
         <Box sx={{ flexGrow: 1, my: 5 }}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <BasicTextFields label="Slip ID" />
               </Grid>
               <Grid item xs={12}>
                  <BasicTextFields label="Bank Name" />
               </Grid>
               <Grid item xs={12}>
                  <UploadButton />
               </Grid>
            </Grid>
         </Box>
      </Container>
   );
}
