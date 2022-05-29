import { useParams, useNavigate, useLocation } from "react-router-dom";

import CustomizedDataGrid from "components/CustomizedDataGrid";

import { getDocuments } from "services/documentService";

export default function Documents() {
   const navigate = useNavigate();
   const { pathname } = useLocation();

   const { pid: proposalId, vid: versionId } = useParams();

   const documents = getDocuments(proposalId, versionId);

   if (!documents) {
      return "invalid link";
   }

   return (
      <CustomizedDataGrid
         fields={["title", "size"]}
         headerNames={["Title", "Size (KiB)"]}
         rows={documents}
         onRowClick={(row) => navigate(`${pathname}/doc-${row.id}`)}
      />
   );
}
