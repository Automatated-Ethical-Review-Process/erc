import { useGetSecretaryAssignedProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";

function SecretaryAssignedProposals() {
  const { data = [], isLoading } = useGetSecretaryAssignedProposalsQuery();
  return (
    <Proposals
      data={data}
      isLoading={isLoading}
      extraFields={{ pi: "Author" }}
    />
  );
}

export default SecretaryAssignedProposals;
