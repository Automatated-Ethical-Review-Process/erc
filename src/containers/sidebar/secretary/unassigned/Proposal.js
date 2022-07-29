import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import BaseProposal from "components/proposals/Proposal";

function Proposal() {
  const navigate = useNavigate();
  return (
    <BaseProposal
      extraFields={{ pi: "Author", coInvestigators: "Co-Investigators" }}
    >
      <Button variant="contained" onClick={() => navigate("review")}>
        Choose Review Type
      </Button>
    </BaseProposal>
  );
}

export default Proposal;