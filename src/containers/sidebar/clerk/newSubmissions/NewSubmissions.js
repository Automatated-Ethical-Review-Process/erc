import { useGetPendingProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";

const NewSubmissions = () => {
  const { data = [], isLoading } = useGetPendingProposalsQuery();

  const proposals = data?.map(({ id, name, type, user }) => ({
    id,
    name,
    type,
    user: user?.name,
  }));

  return (
    <Proposals
      proposals={proposals}
      isLoading={isLoading}
      extraFields={{ user: "PI" }}
    />
  );
};

export default NewSubmissions;
