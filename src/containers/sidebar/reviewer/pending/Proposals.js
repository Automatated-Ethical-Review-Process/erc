import { useGetReviewerPendingProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";

const ReviewerPendingProposals = () => {
  const { data = [], isLoading } = useGetReviewerPendingProposalsQuery();
  return <Proposals proposals={data} isLoading={isLoading} />;
};

export default ReviewerPendingProposals;
