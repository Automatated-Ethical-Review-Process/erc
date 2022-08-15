import { Container } from "@mui/material";
import Link from "@mui/material/Link";
import { useGetEvaluationFormQuery } from "api/data/evaluationForm";
import { useGetUserQuery } from "api/data/user";
import LoadingCircle from "components/common/LoadingCircle";

import TextField from "components/common/TextField";
import { useParams } from "react-router-dom";

export default function Review() {
  const { pid, vid, rid } = useParams();
  const { data, isLoading: isEvaluationLoading } = useGetEvaluationFormQuery({
    pid,
    vid,
    rid,
  });
  const { data: reviwer, isLoading: isReviewerLoading } = useGetUserQuery(rid);
  const isLoading = isReviewerLoading || isEvaluationLoading;
  return (
    <Container>
      <LoadingCircle isLoading={isLoading} />
      <TextField
        sx={{ ml: 3 }}
        label="Reviewer"
        value={reviwer?.name}
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
      <Link href="#" underline="hover" color="warning.main">
        {"Download the Evaluation Form"}
      </Link>
    </Container>
  );
}
