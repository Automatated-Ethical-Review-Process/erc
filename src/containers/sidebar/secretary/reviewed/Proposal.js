import { useLocation, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import BaseProposal from "components/proposals/Proposal";

function Proposal() {
   const { pathname } = useLocation();
   const navigate = useNavigate();

   return (
      <BaseProposal>
         <Button
            variant="contained"
            onClick={() => navigate(`${pathname}/notify`)}
         >
            Notify Author
         </Button>
      </BaseProposal>
   );
}

export default Proposal;
