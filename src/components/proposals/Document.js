import { useParams, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import TextField from "components/common/TextField";

import { getDocument } from "services/data/documentService";

export default function Document() {
  const navigate = useNavigate();
  const { pid: proposalId, vid: versionId, did: documentId } = useParams();

  const document = getDocument(proposalId, versionId, documentId);

  if (!document) {
    return "invalid link";
  }

  const docType = document.title.split(".").pop().toUpperCase();

  const data = [
    { label: "Title", value: document.title },
    { label: "Type", value: docType },
    { label: "Size", value: document.size + "KB" },
    { label: "Date", value: document.date },
    { label: "Time", value: document.time },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container rowSpacing={4}>
        {data.map((item, id) => (
          <Grid key={id} item xs={12}>
            <TextField {...item} readOnly />
          </Grid>
        ))}

        <Grid item xs={12} md={2}>
          <Button variant="contained" onClick={() => navigate("preview")}>
            Preview
          </Button>
        </Grid>

        <Grid item xs={12} md={2}>
          <Button variant="contained" onClick={() => navigate("download")}>
            Download
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
