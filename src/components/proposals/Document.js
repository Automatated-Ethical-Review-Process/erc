import { useNavigate, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import TextField from "components/common/TextField";

import { useGetVersionQuery } from "api/data/version";
import LoadingCircle from "components/common/LoadingCircle";

export default function Document() {
  const navigate = useNavigate();
  const { pid, vid, did, doc } = useParams();

  const {
    data: rawData = {},
    error,
    isLoading,
  } = useGetVersionQuery({ pid, vid }, { skip: !!doc });

  if (error) {
    return "invalid proposal id: " + pid + " or version id: " + vid;
  }

  const document = rawData.documents?.find((d) => d.id === parseInt(did));

  if (!document && !doc) {
    return "invalid document id: " + did;
  }

  const parts = (document?.name || doc || "").split(".");

  const docType = parts.pop().toUpperCase();
  const docName = parts.join(".");

  const data = [
    { label: "Name", value: docName },
    { label: "Type", value: docType },
    { label: "Full Name", value: document?.name || doc || "" },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <LoadingCircle isLoading={isLoading} />
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
