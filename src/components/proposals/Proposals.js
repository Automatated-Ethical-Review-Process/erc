import { useNavigate } from "react-router-dom";

import DataGrid from "components/common/DataGrid";

export default function Proposals({
  data,
  isLoading,
  extraFields = {
    date: "Date",
  },
}) {
  const navigate = useNavigate();

  const fields = {
    name: "Name",
    type: "Type",
    ...extraFields,
  };

  if (data?.length > 0) {
    data = data.map((i) => ({
      ...i,
      date: new Date(i.date).toLocaleDateString(),
    }));
  }

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
