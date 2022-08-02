import { useParams, useNavigate } from "react-router-dom";

import { Container } from "@mui/material";

import DataGrid from "components/common/DataGrid";

import { getVersions } from "services/data/versionService";

export default function Versions(props) {
  const navigate = useNavigate();

  const { pid: proposalId } = useParams();

  const versions = getVersions(proposalId);

  if (!versions) {
    return "invalid link";
  }

  return (
    <>
      <DataGrid
        fields={["id", "submitDate"]}
        headerNames={["Version", "Submit Date"]}
        rows={versions}
        onRowClick={(row) => navigate(String(row.id))}
      />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {props.children}
      </Container>
    </>
  );
}
