import { useParams, useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import TextField from "components/common/TextField";

import { getDocument } from "services/documentService";

export default function Document() {
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const { pid: proposalId, vid: versionId, did: documentId } = useParams();

   const document = getDocument(proposalId, versionId, documentId);

   if (!document) {
      return "invalid link";
   }

   const docType = document.title.split(".").pop().toUpperCase();

   return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
         <Box sx={{ flexGrow: 1 }}>
            <Grid container rowSpacing={4} justifyContent="flex-end">
               <Grid item xs={12}>
                  <TextField label="Title" value={document.title} readOnly />
               </Grid>

               <Grid item xs={12}>
                  <TextField label="Type" value={docType} readOnly />
               </Grid>

               <Grid item xs={12}>
                  <TextField
                     label="Size"
                     value={document.size + "KB"}
                     readOnly
                  />
               </Grid>

               <Grid item xs={12}>
                  <TextField label="Date" value={document.date} readOnly />
               </Grid>

               <Grid item xs={12}>
                  <TextField label="Time" value={document.time} readOnly />
               </Grid>

               <Grid item xs={12} md={3}>
                  <Button
                     variant="contained"
                     onClick={() => navigate(`${pathname}/preview`)}
                  >
                     Preview
                  </Button>
               </Grid>

               <Grid item xs={12} md={3}>
                  <Button
                     variant="contained"
                     onClick={() => navigate(`${pathname}/download`)}
                  >
                     Download
                  </Button>
               </Grid>

               <Grid item xs={12} md={6}></Grid>
            </Grid>
         </Box>
      </Container>
   );
}
