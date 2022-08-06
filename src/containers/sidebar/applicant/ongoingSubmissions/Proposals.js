import { useGetUserActiveProposalsQuery } from "api/data/proposal";
import Proposals from "components/proposals/Proposals";

function ApplicantOngoingSubmissions() {
  const { data = [], isLoading } = useGetUserActiveProposalsQuery();
  return (
    <Proposals
      proposals={data}
      isLoading={isLoading}
      extraFields={{ status: "Status" }}
    />
  );
}

export default ApplicantOngoingSubmissions;
