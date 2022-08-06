import { useGetUserOldProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";

function ApplicantOldSubmissions() {
  const { data = [], isLoading } = useGetUserOldProposalsQuery();
  return (
    <Proposals
      proposals={data}
      isLoading={isLoading}
      extraFields={{ status: "Status" }}
    />
  );
}

export default ApplicantOldSubmissions;
