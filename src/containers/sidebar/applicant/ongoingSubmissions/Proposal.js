import { useGetLatestVersionQuery } from "api/data/version";
import BaseProposal from "components/proposals/Proposal";
import { VersionStatus } from "config/enums";
import { useNavigate, useParams } from "react-router-dom";

export default function Proposal() {
  const navigate = useNavigate();

  const { pid } = useParams();
  const { data: { status } = {}, isLoading } = useGetLatestVersionQuery(pid);

  let rightButton = null;

  if (status === VersionStatus.minor || status === VersionStatus.major) {
    rightButton = {
      text: "Submit a new version",
      onClick: () => navigate("new-version"),
    };
  }

  return (
    <BaseProposal
      loading={isLoading}
      extraFields={{ status: "Status" }}
      rightButton={rightButton}
    />
  );
}
