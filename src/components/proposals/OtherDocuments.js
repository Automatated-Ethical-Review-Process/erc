import { useNavigate, useParams } from "react-router-dom";

import { Container } from "@mui/material";

import DataGrid from "components/common/DataGrid";
import { useGetProposalQuery } from "api/data/proposal";

const mapper = new Map([
  ["erc-cert", "ercApprovedCertificates"],
  ["train-cert", "trainCertificates"],
]);

export default function OtherDocuments({ children }) {
  const navigate = useNavigate();

  const { pid, type } = useParams();

  const {
    data: { [mapper.get(type)]: rawData } = {},
    error,
    isLoading,
  } = useGetProposalQuery(pid, { skip: !type });

  if (!type || !mapper.has(type)) {
    return "invalid type";
  }

  if (error) {
    return "invalid proposal id: " + pid;
  }

  const documents = Array.isArray(rawData) ? rawData : [rawData];

  const rows = documents.map((doc, id) => ({ id: id + 1, doc }));

  return (
    <>
      <DataGrid
        fields={["id", "doc"]}
        headerNames={["No", "Document"]}
        rows={rows}
        onRowClick={(row) => navigate(`doc-${row.doc}`)}
        loading={isLoading}
      />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
