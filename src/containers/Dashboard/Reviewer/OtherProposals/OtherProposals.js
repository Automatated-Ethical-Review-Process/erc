import { useNavigate } from "react-router-dom";

import CustomizedDataGrid from "../../../../components/CustomizedDataGrid";
import tableData from "../../../../db.json";

export default function OtherProposals() {
   const navigate = useNavigate();

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
            rows={tableData.proposals.rows}
            onRowClick={(row) =>
               navigate("/reviewer/other/proposals", { state: row })
            }
         />
      </>
   );
}
