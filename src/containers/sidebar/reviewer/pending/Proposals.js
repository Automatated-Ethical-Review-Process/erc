import { useGetReviewerPendingProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";
import useUser from "hooks/useUser";

const ReviewerPendingProposals = () => {
  const { id: rid } = useUser();
  const { data = [], isLoading } = useGetReviewerPendingProposalsQuery(rid);
  return <Proposals proposals={data} isLoading={isLoading} />;
};

export default ReviewerPendingProposals;
