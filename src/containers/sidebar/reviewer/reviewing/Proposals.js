import { useGetReviewerInReviewProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";
import useUser from "hooks/useUser";

const ReviewerReviewingProposals = () => {
  const { id: rid } = useUser();
  const { data = [], isLoading } = useGetReviewerInReviewProposalsQuery(rid);
  return <Proposals data={data} isLoading={isLoading} />;
};

export default ReviewerReviewingProposals;
