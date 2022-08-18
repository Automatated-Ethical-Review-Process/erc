import BaseProposal from "components/proposals/Proposal";
import { useNavigate } from "react-router-dom";

export default function Proposal() {
  const navigate = useNavigate();
  return (
    <BaseProposal
      extraFields={{ status: "Status" }}
      rightButton={{
        text: "Submit New Version",
        onClick: () => navigate("new-version"),
      }}
    />
  );
}
