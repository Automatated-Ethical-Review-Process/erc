import { Button, Container, Grid, Typography } from "@mui/material";
import { useAddVersionMutation } from "api/data/version";
import { BasicForm } from "components/common/Form";
import LoadingCircle from "components/common/LoadingCircle";
import { FileInputController } from "components/controllers";
import useNotify from "hooks/useNotify";
import { useNavigate, useParams } from "react-router-dom";
import { yObject, yFile, yFiles } from "utils/yup";

const schema = yObject({
  proposal: yFile.required("Proposal is required"),
  supplementary: yFiles.required("Supplementary is required"),
});

function SubmitNewVersion() {
  const [addVersion, { isLoading }] = useAddVersionMutation();

  const { pid } = useParams();
  const { notify } = useNotify();
  const navigate = useNavigate();

  const onSubmit = (data) =>
    addVersion({ pid, data })
      .unwrap()
      .then(() => {
        notify("Version added successfully", "success");
        navigate(-1, { replace: true });
      })
      .catch(({ data }) =>
        notify(data?.message || "Something went wrong", "error")
      );

  return (
    <Container maxWidth="md" sx={{ my: 3 }}>
      <LoadingCircle isLoading={isLoading} />
      <BasicForm schema={schema} onSubmit={onSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography>Submit a new version</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FileInputController
              fullWidth
              name="proposal"
              label="Upload the proposal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FileInputController
              fullWidth
              name="supplementary"
              label="Upload the supplementary"
              multiple
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </BasicForm>
    </Container>
  );
}

export default SubmitNewVersion;
