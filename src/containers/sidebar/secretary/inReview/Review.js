import { Button, Container } from "@mui/material";
import { useGetEvaluationFormQuery } from "api/data/evaluationForm";
import { useGetUserQuery } from "api/data/user";
import LoadingCircle from "components/common/LoadingCircle";

import TextField from "components/common/TextField";
import useDownload from "hooks/useDownload";
import { useParams } from "react-router-dom";

export default function Review() {
  const { pid, vid, rid } = useParams();

  const { data = {}, isLoading: isEvaluationLoading } =
    useGetEvaluationFormQuery({
      pid,
      vid,
      rid,
    });

  const { data: reviewer, isLoading: isReviewerLoading } = useGetUserQuery(rid);

  const { download, isLoading: isFileLoading } = useDownload(data.file);

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
        <Button onClick={download} color="warning">
          Download the Evaluation Form
        </Button>
      )}
    </Container>
  );
}
