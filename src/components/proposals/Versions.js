import { useNavigate, useParams } from "react-router-dom";

import { Container } from "@mui/material";

import DataGrid from "components/common/DataGrid";

import { useGetVersionsQuery } from "api/data/proposal";

export default function Versions({ children }) {
  const navigate = useNavigate();

  const { pid: proposalId } = useParams();

  const { data = [], error, isLoading } = useGetVersionsQuery(proposalId);

  if (error) {
    return "invalid proposal id: " + proposalId;
  }

  const versions = data.map((i) => ({ ...i, documents: i.documents?.length }));

  return (
    <>
      <DataGrid
        fields={["number", "documents", "status"]}
        headerNames={["Version", "Documents", "Status"]}
        rows={versions}
        onRowClick={(row) => navigate(String(row.id))}
        loading={isLoading}
      />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
