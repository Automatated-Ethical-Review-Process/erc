import { Button, Container } from "@mui/material";
import { useGetEvaluationFormQuery } from "api/data/evaluationForm";
import { useGetFileQuery } from "api/data/file";
import { useGetUserQuery } from "api/data/user";
import LoadingCircle from "components/common/LoadingCircle";

import TextField from "components/common/TextField";
import { useParams } from "react-router-dom";
import { onDownload } from "utils/download";

export default function Review() {
  const { pid, vid, rid } = useParams();

  const { data = {}, isLoading: isEvaluationLoading } =
    useGetEvaluationFormQuery({
      pid,
      vid,
      rid,
    });

  const { data: reviewer, isLoading: isReviewerLoading } = useGetUserQuery(rid);

  const { data: blob, isLoading: isFileLoading } = useGetFileQuery(data.file, {
    skip: !data.file,
  });

  const isLoading = isReviewerLoading || isEvaluationLoading || isFileLoading;

  return (
    <Container>
      <LoadingCircle isLoading={isLoading} />
      <TextField
        sx={{ ml: 3 }}
        label="Reviewer"
        value={reviewer?.name}
        readOnly
      />
      <br />
      <TextField
        sx={{ ml: 3, mt: 3 }}
        label="Decision"
        value={data?.decision}
        readOnly
      />
      <br />
      <br />
      {data.file && (
        <Button onClick={() => onDownload(blob, data.file)} color="warning">
          Download the Evaluation Form
        </Button>
      )}
    </Container>
  );
}
