import { useNavigate, useLocation } from "react-router-dom";

import Button from "@mui/material/Button";

import BaseProposal from "components/proposals/Proposal";

function Proposal() {
   const navigate = useNavigate();
   const { pathname } = useLocation();
   return (
      <BaseProposal>
         <Button
            variant="contained"
            onClick={() => navigate(`${pathname}/review`)}
         >
            Choose Review Type
         </Button>
      </BaseProposal>
   );
}

export default Proposal;
