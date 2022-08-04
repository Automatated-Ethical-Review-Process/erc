import { useGetReviewerInReviewProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";

const ReviewerReviewingProposals = () => {
  const { data = [], isLoading } = useGetReviewerInReviewProposalsQuery();
  return <Proposals proposals={data} isLoading={isLoading} />;
};

export default ReviewerReviewingProposals;
