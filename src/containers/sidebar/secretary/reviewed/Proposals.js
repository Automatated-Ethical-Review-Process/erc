import { useGetSecretaryReviewedProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";

function SecretaryReviewedProposals() {
  const { data = [], isLoading } = useGetSecretaryReviewedProposalsQuery();
  return (
    <Proposals
      data={data}
      isLoading={isLoading}
      extraFields={{ reviewType: "Review Type", reviewers: "Reviewers" }}
    />
  );
}

export default SecretaryReviewedProposals;
