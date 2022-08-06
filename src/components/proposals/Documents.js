import { useNavigate, useParams } from "react-router-dom";

import { Container } from "@mui/material";

import DataGrid from "components/common/DataGrid";

import { useGetVersionQuery } from "api/data/version";

export default function Documents({ children }) {
  const navigate = useNavigate();

  const { pid, vid } = useParams();

  const { data = {}, error, isLoading } = useGetVersionQuery({ pid, vid });

  // if (error) {
  //   return "invalid proposal id: " + pid + " or version id: " + vid;
  // } // TODO: handle error

  return (
    <>
      <DataGrid
        fields={["file", "type"]}
        headerNames={["File", "Type"]}
        rows={data.documents}
        onRowClick={(row) => navigate(`doc-${row.id}`)}
        loading={isLoading}
      />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
