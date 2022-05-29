import { useParams, useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import ReadOnlyTextField from "components/common/ReadOnlyTextField";

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
                  <ReadOnlyTextField label="Title" value={document.title} />
               </Grid>

               <Grid item xs={12}>
                  <ReadOnlyTextField label="Type" value={docType} />
               </Grid>

               <Grid item xs={12}>
                  <ReadOnlyTextField
                     label="Size"
                     value={document.size + "KB"}
                  />
               </Grid>

               <Grid item xs={12}>
                  <ReadOnlyTextField label="Date" value={document.date} />
               </Grid>

               <Grid item xs={12}>
                  <ReadOnlyTextField label="Time" value={document.time} />
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
