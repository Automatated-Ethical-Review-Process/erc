import { useGetSecretaryUnassignedProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";

function SecretaryUnassignedProposals() {
  const { data = [], isLoading } = useGetSecretaryUnassignedProposalsQuery();
  return (
    <Proposals
      data={data}
      isLoading={isLoading}
      extraFields={{ pi: "Author" }}
    />
  );
}

export default SecretaryUnassignedProposals;
