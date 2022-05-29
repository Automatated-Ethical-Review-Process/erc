import { useNavigate } from "react-router-dom";

import DataGrid from "components/common/DataGrid";
import { getProposals } from "services/proposalService";

export default function ReviewingProposals() {
   const navigate = useNavigate();
   const proposals = getProposals();

   return (
      <>
         <DataGrid
            fields={["id", "name", "category", "deadline"]}
            headerNames={[
               "Proposal ID",
               "Proposal Name",
               "Category",
               "Deadline",
            ]}
            rows={proposals}
            onRowClick={(row) => navigate("/reviewer/reviewing/" + row.id)}
         />
      </>
   );
}
