import { useNavigate } from "react-router-dom";

import DataGrid from "components/common/DataGrid";

export default function Proposals({
  data,
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
      rows={data}
      onRowClick={(row) => navigate(String(row.id))}
      loading={isLoading}
    />
  );
}
