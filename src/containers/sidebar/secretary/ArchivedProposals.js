import { useGetSecretaryArchivedProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";

function SecretaryArchivedProposals() {
  const { data = [], isLoading } = useGetSecretaryArchivedProposalsQuery();
  return (
    <Proposals
      data={data}
      isLoading={isLoading}
      extraFields={{ pi: "Author" }}
    />
  );
}

export default SecretaryArchivedProposals;
