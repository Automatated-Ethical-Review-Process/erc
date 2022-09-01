import { Container } from "@mui/material";
import { useGetProposalQuery } from "api/data/proposal";
import LoadingCircle from "components/common/LoadingCircle";
import { EReviewType } from "config/enums";
import { useParams } from "react-router-dom";
import { Expedited, FullBoard } from "../unassigned/ChooseReviewType";

function EditReviewers() {
  const { pid } = useParams();

  const { data, isLoading } = useGetProposalQuery(pid);

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <LoadingCircle isLoading={isLoading} />
      {data &&
        (data.reviewType === EReviewType.expedited ? (
          <Expedited type={null} />
        ) : (
          <FullBoard type={null} />
        ))}
    </Container>
  );
}

export default EditReviewers;
