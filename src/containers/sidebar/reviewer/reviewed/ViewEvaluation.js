import { Box, Button, Container } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { useGetEvaluationFormQuery } from "api/data/evaluationForm";
import { useGetFileQuery } from "api/data/file";
import LoadingCircle from "components/common/LoadingCircle";
import useUser from "hooks/useUser";
import { useParams } from "react-router-dom";
import { onDownload } from "utils/download";

export default function ViewEvaluation() {
  const { pid, vid } = useParams();
  const { id: rid } = useUser();

  const { data = {}, isLoading: isEvaluationLoading } =
    useGetEvaluationFormQuery({ pid, vid, rid });

  // TODO: handle data not found

  const { data: blob, isLoading: isFileLoading } = useGetFileQuery(data.file, {
    skip: !data.file,
  });

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
        <Button onClick={() => onDownload(blob, data.file)} color="warning">
          Download the Evaluation Form
        </Button>
      )}
    </Container>
  );
}
