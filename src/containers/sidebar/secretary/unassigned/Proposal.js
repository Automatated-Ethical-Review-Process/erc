import { useNavigate } from "react-router-dom";

import BaseProposal from "components/proposals/Proposal";

function Proposal() {
  const navigate = useNavigate();
  return (
    <BaseProposal
      extraFields={{ pi: "Author", cis: "Co-Investigators" }}
      rightButton={{
        text: "Choose Review Type",
        onClick: () => navigate("review"),
      }}
    />
  );
}

export default Proposal;
