import { useNavigate } from "react-router-dom";

import CustomizedDataGrid from "components/CustomizedDataGrid";
import { getProposals } from "services/proposalService";

export default function PendingProposals() {
   const navigate = useNavigate();
   const proposals = getProposals();

   return (
      <>
         <CustomizedDataGrid
            fields={["id", "name", "category", "deadline"]}
            headerNames={[
               "Proposal ID",
               "Proposal Name",
               "Category",
               "Deadline",
            ]}
            rows={proposals}
            onRowClick={(row) => navigate("/reviewer/pending/" + row.id)}
         />
      </>
   );
}
