import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import BaseProposal from "components/proposals/Proposal";
import { useAddVersionMutation } from "api/data/version";
import { useParams } from "react-router-dom";

const Input = styled("input")({
  display: "none",
});

export function UploadButton({ onFileUpload }) {
  return (
    <label htmlFor="contained-button-file">
      <Input
        accept=".pdf"
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e) => onFileUpload(e.target.files)}
      />
      <Button variant="contained" component="span" sx={{ minWidth: "15vw" }}>
        Submit New Version
      </Button>
    </label>
  );
}

export default function BasicGrid() {
  const [addVersion, { isLoading }] = useAddVersionMutation();
  const { pid } = useParams();

  const onFileUpload = (files) => {
    const formData = new FormData();
    formData.append("proposal", files[0]);
    formData.append("supplementary", files[0]);
    formData.append("supplementary", files[0]);
    formData.append("supplementary", files[0]);
    formData.append("supplementary", files[0]);
    formData.append("supplementary", files[0]);
    addVersion({ pid, body: formData });
  };

  return (
    <BaseProposal loading={isLoading} extraFields={{ status: "Status" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <UploadButton onFileUpload={onFileUpload} />
        </Grid>
      </Grid>
    </BaseProposal>
  );
}
