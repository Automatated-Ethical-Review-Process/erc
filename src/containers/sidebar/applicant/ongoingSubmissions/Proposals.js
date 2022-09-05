import { useGetUserActiveProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";

function ApplicantOngoingSubmissions() {
  const { data = [], isLoading } = useGetUserActiveProposalsQuery();
  return (
    <Proposals
      data={data}
      isLoading={isLoading}
      extraFields={{ status: "Status", pi: "PI" }}
    />
  );
}

export default ApplicantOngoingSubmissions;
