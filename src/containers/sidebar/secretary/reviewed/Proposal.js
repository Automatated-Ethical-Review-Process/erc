import { useNavigate } from "react-router-dom";

import BaseProposal from "components/proposals/Proposal";

function Proposal() {
  const navigate = useNavigate();

  return (
    <BaseProposal
      extraFields={{
        pi: "Author",
        cis: "Co-Investigators",
        reviewType: "Review Type",
        reviewers: "Reviewers",
      }}
      rightButton={{
        text: "Notify Author",
        onClick: () => navigate("notify"),
      }}
    />
  );
}

export default Proposal;
