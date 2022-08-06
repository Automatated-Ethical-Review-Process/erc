import { useGetSecretaryReviewingProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";

function SecretaryInReviewProposals() {
  const { data = [], isLoading } = useGetSecretaryReviewingProposalsQuery();
  return (
    <Proposals
      data={data}
      isLoading={isLoading}
      extraFields={{ reviewType: "Review Type", reviewers: "Reviewers" }}
    />
  );
}

export default SecretaryInReviewProposals;
