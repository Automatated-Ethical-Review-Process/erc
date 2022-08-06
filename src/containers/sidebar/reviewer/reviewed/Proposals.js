import { useGetReviewerReviewedProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";
import useUser from "hooks/useUser";

const ReviewerReviewedProposals = () => {
  const { id: rid } = useUser();
  const { data = [], isLoading } = useGetReviewerReviewedProposalsQuery(rid);
  console.log(data);
  return <Proposals data={data} isLoading={isLoading} extraFields={null} />;
};

export default ReviewerReviewedProposals;
