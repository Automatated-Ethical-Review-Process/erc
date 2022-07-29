import { useNavigate } from "react-router-dom";

import DataGrid from "components/common/DataGrid";
import { getProposals } from "services/data/proposalService";

export default function Proposals({
  extraFields = {
    deadline: "Deadline",
  },
}) {
  const navigate = useNavigate();
  const proposals = getProposals();

  const fields = {
    name: "Proposal Name",
    category: "Category",
    ...extraFields,
  };

  return (
    <DataGrid
      fields={Object.keys(fields)}
      headerNames={Object.values(fields)}
      rows={proposals}
      onRowClick={(row) => navigate(String(row.id))}
    />
  );
}
