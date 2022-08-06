import { useGetReviewerOtherProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";
import useUser from "hooks/useUser";

function ReviewerOtherProposals() {
  const { id: rid } = useUser();
  const { data = [], isLoading } = useGetReviewerOtherProposalsQuery(rid);
  return <Proposals data={data} isLoading={isLoading} extraFields={null} />;
}

export default ReviewerOtherProposals;
