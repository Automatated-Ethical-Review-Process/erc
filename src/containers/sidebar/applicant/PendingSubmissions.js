import { useGetUserPendingProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";

function ApplicantPendingSubmissions() {
  const { data = [], isLoading } = useGetUserPendingProposalsQuery();
  return (
    <Proposals
      data={data}
      isLoading={isLoading}
      extraFields={{ status: "Status" }}
    />
  );
}

export default ApplicantPendingSubmissions;
