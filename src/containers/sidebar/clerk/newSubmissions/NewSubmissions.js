import { useGetClerkNewProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";

const NewSubmissions = () => {
  const { data = [], isLoading } = useGetClerkNewProposalsQuery();

  return (
    <Proposals
      proposals={data}
      isLoading={isLoading}
      extraFields={{ pi: "PI", status: "Status" }}
    />
  );
};

export default NewSubmissions;
