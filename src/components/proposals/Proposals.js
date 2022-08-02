import { useNavigate } from "react-router-dom";

import DataGrid from "components/common/DataGrid";
import { getProposals } from "services/data/proposalService";

export default function Proposals({
  proposals = getProposals(), // TODO remove this
  isLoading,
  extraFields = {
    deadline: "Deadline",
  },
}) {
  const navigate = useNavigate();

  const fields = {
    name: "Name",
    type: "Type",
    ...extraFields,
  };

  return (
    <DataGrid
      fields={Object.keys(fields)}
      headerNames={Object.values(fields)}
      rows={proposals}
      onRowClick={(row) => navigate(String(row.id))}
      loading={isLoading}
    />
  );
}
