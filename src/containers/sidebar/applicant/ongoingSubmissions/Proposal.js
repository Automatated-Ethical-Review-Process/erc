import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import BaseProposal from "components/proposals/Proposal";

const Input = styled("input")({
  display: "none",
});

export function UploadButton() {
  return (
    <label htmlFor="contained-button-file">
      <Input accept="image/*" id="contained-button-file" multiple type="file" />
      <Button variant="contained" component="span" sx={{ minWidth: "15vw" }}>
        Submit New Version
      </Button>
    </label>
  );
}

export default function BasicGrid() {
  return (
    <BaseProposal extraFields={{ status: "Status" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <UploadButton />
        </Grid>
      </Grid>
    </BaseProposal>
  );
}
