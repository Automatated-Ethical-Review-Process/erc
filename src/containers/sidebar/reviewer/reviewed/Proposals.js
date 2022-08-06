import { useGetReviewerReviewedProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";
import useUser from "hooks/useUser";

const ReviwerReviewedProposals = () => {
  const { id: rid } = useUser();
  const { data = [], isLoading } = useGetReviewerReviewedProposalsQuery(rid);
  console.log(data);
  return <Proposals proposals={data} isLoading={isLoading} />;
};

export default ReviwerReviewedProposals;
