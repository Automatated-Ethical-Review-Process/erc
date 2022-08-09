import { Box, Container } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { useGetEvaluationFormQuery } from "api/data/evaluationForm";
import LoadingCircle from "components/common/LoadingCircle";
import useUser from "hooks/useUser";
import { useParams } from "react-router-dom";

export default function ViewEvaluation() {
  const { pid, vid } = useParams();
  const { id: rid } = useUser();

  const { data = {}, isLoading } = useGetEvaluationFormQuery({ pid, vid, rid });

  // TODO: handle data not found

  return (
    <Container>
      <LoadingCircle isLoading={isLoading} />
      <FormControl>
        <Typography variant="h5">Decision</Typography>
        <Box ml={3}>
          <RadioGroup defaultValue="approve" name="radio-buttons-group" ml="2">
            <FormControlLabel
              value="approve"
              control={<Radio />}
              label={data.decision}
              selected
            />
          </RadioGroup>
        </Box>
        {/* TODO: show file here */}
        <Link href="#" underline="hover" color="warning.main">
          {"Download the Evaluation Form"}
        </Link>
      </FormControl>
    </Container>
  );
}
