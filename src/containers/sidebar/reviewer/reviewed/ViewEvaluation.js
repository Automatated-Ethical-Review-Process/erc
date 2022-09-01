import { Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useGetEvaluationFormQuery } from "api/data/evaluationForm";
import LoadingCircle from "components/common/LoadingCircle";
import useDownload from "hooks/useDownload";
import useUser from "hooks/useUser";
import { useParams } from "react-router-dom";

export default function ViewEvaluation() {
  const { pid, vid } = useParams();
  const { id: rid } = useUser();

  const { data = {}, isLoading: isEvaluationLoading } =
    useGetEvaluationFormQuery({ pid, vid, rid });

  // TODO: handle data not found

  const { download, isLoading: isFileLoading } = useDownload(data.file);

  const isLoading = isEvaluationLoading || isFileLoading;

  return (
    <Container>
      <LoadingCircle isLoading={isLoading} />
      <Typography variant="subtitle1">Decision</Typography>
      <Typography variant="body1" sx={{ ml: 3 }}>
        {data.decision}
      </Typography>
      {data.file && (
        <Button sx={{ mt: 3 }} onClick={download} color="warning">
          Download the Evaluation Form
        </Button>
      )}
    </Container>
  );
}
