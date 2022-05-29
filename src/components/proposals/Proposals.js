import { useNavigate, useLocation } from "react-router-dom";

import DataGrid from "components/common/DataGrid";
import { getProposals } from "services/proposalService";

export default function Proposals() {
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const proposals = getProposals();

   return (
      <DataGrid
         fields={["id", "name", "category", "deadline"]}
         headerNames={["Proposal ID", "Proposal Name", "Category", "Deadline"]}
         rows={proposals}
         onRowClick={(row) => navigate(`${pathname}/${row.id}`)}
      />
   );
}
