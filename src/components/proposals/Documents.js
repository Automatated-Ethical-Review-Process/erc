import { useParams, useNavigate, useLocation } from "react-router-dom";

import { Container } from "@mui/material";

import DataGrid from "components/common/DataGrid";

import { getDocuments } from "services/documentService";

export default function Documents(props) {
   const navigate = useNavigate();
   const { pathname } = useLocation();

   const { pid: proposalId, vid: versionId } = useParams();

   const documents = getDocuments(proposalId, versionId);

   if (!documents) {
      return "invalid link";
   }

   return (
      <>
         <DataGrid
            fields={["title", "size"]}
            headerNames={["Title", "Size (KiB)"]}
            rows={documents}
            onRowClick={(row) => navigate(`${pathname}/doc-${row.id}`)}
         />
         <Container maxWidth="md" sx={{ mt: 4 }}>
            {props.children}
         </Container>
      </>
   );
}
