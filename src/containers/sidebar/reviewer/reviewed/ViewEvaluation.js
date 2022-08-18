import { Box, Button, Container } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
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
      <Typography variant="h5">Decision</Typography>
      <Box ml={3}>
        <RadioGroup defaultValue="approve" ml="2">
          <FormControlLabel
            value="approve"
            control={<Radio />}
            label={data.decision}
            selected
          />
        </RadioGroup>
      </Box>
      {data.file && (
        <Button onClick={download} color="warning">
          Download the Evaluation Form
        </Button>
      )}
    </Container>
  );
}
