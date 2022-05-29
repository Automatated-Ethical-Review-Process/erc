import { useParams, useNavigate, useLocation } from "react-router-dom";

import CustomizedDataGrid from "components/CustomizedDataGrid";

import { getVersions } from "services/versionService";

export default function Versions() {
   const navigate = useNavigate();
   const { pathname } = useLocation();

   const { pid: proposalId } = useParams();

   const versions = getVersions(proposalId);

   if (!versions) {
      return "invalid link";
   }

   return (
      <CustomizedDataGrid
         fields={["id", "submitDate"]}
         headerNames={["Version", "Submit Date"]}
         rows={versions}
         onRowClick={(row) => navigate(`${pathname}/${row.id}`)}
      />
   );
}
